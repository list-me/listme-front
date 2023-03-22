/* eslint-disable */

import React, { useCallback, useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import { Divider } from 'antd';
import { ITableFieldProps } from "./TableField.d";
import { Container, Footer, Item, Select, SuspenseMenu } from "./styles"
import {ReactComponent as ChevronDownIcon} from "../../assets/chevron-down.svg";
import {ReactComponent as PencilIcon} from "../../assets/pencei-icon.svg";
import { CustomRadio } from '../Radio';
import { CustomCheckBox } from '../CustomCheckBox';

export const TableField: React.FC<ITableFieldProps> = ({
  value,
  type,
  options,
  handleSetNewValue = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const iconRef = useRef(null);
  const [newValue, setNewValue] = useState<string[]>(value);

  const handleAccertOptions = (options: string[]) => {
    return options.map((option) => {
      return {
        label: option[0].toUpperCase() + option.substring(1),
        value: option
      }
    })
  }

  const onClose = (): void => setIsOpen(!open); 

  useEffect(() => {
    function handleOutsideClick(event) {
      if (iconRef.current && iconRef.current!.contains(event.target)) {
        return;
      }

      if (modalRef.current && !modalRef.current!.contains(event.target)) {
        onClose();
      }
    }
  
    document.addEventListener('mousedown', handleOutsideClick);
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };

  }, [iconRef, modalRef, isOpen]);

  return (
    <>
      <Container type={type}>
        <label> 
          {newValue?.map((valueItem: string, index) => {
            if (newValue.length > 1 && index < newValue.length -1) {
              return `${valueItem}, `
            }

            return valueItem;
          })}
        </label>
        <span
          // ref={iconRef}
          // onClick={() => setIsOpen(true)}
        >
          <ChevronDownIcon 
            ref={iconRef}
            onClick={() => setIsOpen(!isOpen)}
          />
        </span>
      </Container>
      {
          isOpen ? 
          <SuspenseMenu ref={modalRef}>
              <span className='firstContent'>
                {
                  type === "radio" ?
                    <CustomRadio
                      options={options}
                      value={newValue[0]}
                      handleGetNewValue={(item) => {
                        setNewValue([item])
                        handleSetNewValue(item)
                      }}
                    />
                  : (type === "list" ?
                    <Select>
                      {
                        options.map((option)=> {
                          return (
                            <Item onClick={() => {
                              handleSetNewValue(option);
                              setNewValue([option])
                              // setIsOpen(false);
                            }}>{option}</Item>
                          )
                        })
                      }
                    </Select> :
                    <CustomCheckBox
                        options={options}
                        defaultCheckedList={value}
                        handleGetNewValue={(e: any) => {
                          setNewValue(e)
                          handleSetNewValue(e)
                        }}
                    />)
                }
                {/* <Divider
                  style={{marginTop: "16px", marginBottom:"16px"}}
                /> */}
              </span>
              {/* <Footer
                onClick={() => handleOpenModal()}
              >
                <PencilIcon />
                Editar campo
              </Footer> */}
          </SuspenseMenu> :
          <></>
      }
    </>
  );
}

// const areEqual = (prevProps, nextProps) => {
//   return JSON.stringify(prevProps.value) === JSON.stringify(nextProps.value);
// };

// export const TableField = React.memo(Cell, areEqual);
// // export {TableField};
