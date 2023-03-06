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

const TableField: React.FC<ITableFieldProps> = ({value, type, options, handleGetNewValue = () => {}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [newValue, setNewValue] = useState(value);

  const handleAccertOptions = (options: string[]) => {
    return options.map((option) => {
      return {
        label: option[0].toUpperCase() + option.substring(1),
        value: option
      }
    })
  }

  const onClose = (): void => setIsOpen(false); 

  useEffect(() => {
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current!.contains(event.target)) {
        onClose();
      }
    }
  
    document.addEventListener('mousedown', handleOutsideClick);
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };

  }, [onClose, modalRef]);

  return (
    <>
      <Container type={type}>
        <label> 
          {newValue.map((valueItem: string, index) => {
            if (newValue.length > 1 && index < newValue.length -1) {
              return `${valueItem}, `
            }

            return valueItem;
          })}
        </label>
        <span
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDownIcon />
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
                      handleGetNewValue(item)
                    }}
                  />
                    : (type === "list" ?
                    <Select>
                      {
                        options.map((option)=> {
                          return (
                            <Item onClick={() => {
                              handleGetNewValue(option);
                              setNewValue([option])
                              setIsOpen(false);
                            }}>{option}</Item>
                          )
                        })
                      }
                    </Select>
                    : <CustomCheckBox
                      options={options}
                      defaultCheckedList={value}
                      handleGetNewValue={(e: any) => {
                        setNewValue(e)
                        handleGetNewValue(e)
                      }}
                    />)
                }
                <Divider />
              </span>
              <Footer>
                <PencilIcon />
                Editar campo
              </Footer>
          </SuspenseMenu> :
          <></>
      }
    </>
  );
}

export {TableField};