/* eslint-disable */

import React, { useCallback, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { Divider } from "antd";
import { ITableFieldProps } from "./TableField.d";
import { Container, Footer, Item, Select, SuspenseMenu } from "./styles";
import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down.svg";
import { ReactComponent as PencilIcon } from "../../assets/pencei-icon.svg";
import { CustomRadio } from "../Radio";
import { CustomCheckBox } from "../CustomCheckBox";
import Dropzone from "../Dropzone";
import { ImageContextProvider } from "../../context/images";
import { Relation } from "./Relation";

export const TableField: React.FC<ITableFieldProps> = ({
  value,
  type,
  options,
  handleSetNewValue = () => {},
  col,
  instance,
  row,
  prop,
  td,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState<string[]>(value);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleAccertOptions = (options: string[]) => {
    return options.map((option) => {
      return {
        label: option[0].toUpperCase() + option.substring(1),
        value: option,
      };
    });
  };

  const FIELD_TYPES = {
    file: (
      <Dropzone
        col={col}
        instance={instance}
        row={row}
        value={value}
        prop={prop}
      />
    ),
    relation: <Relation />,
  };

  const onClose = (): void => {
    setIsOpen(false);

    if (!(newValue !== value)) {
      return;
    }

    const updatedValue = typeof newValue === "object" ? newValue : [newValue];
    instance.setDataAtRowProp(row, prop, updatedValue);
  };

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (elementRef.current && elementRef.current!.contains(event.target)) {
        return;
      }

      if (modalRef.current && !modalRef.current!.contains(event.target)) {
        onClose();
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("wheel", handleOutsideClick);
    window.addEventListener("keydown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("wheel", handleOutsideClick);
      window.removeEventListener("keydown", handleOutsideClick);
    };
  }, [isOpen, newValue]);

  return (
    <ImageContextProvider>
      {type == "file" || type == "relation" ? (
        FIELD_TYPES[type]
      ) : (
        <Container
          type={type}
          ref={elementRef}
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
              const updatedValue =
                typeof newValue === "object" ? newValue : [newValue];
              instance.setDataAtRowProp(row, prop, updatedValue);

              return;
            } else {
              setIsOpen(true);
            }
          }}
        >
          <label>
            {newValue?.map((valueItem: string, index) => {
              if (newValue.length > 1 && index < newValue.length - 1) {
                return `${valueItem}, `;
              }

              return valueItem;
            })}
          </label>
          <span>
            <ChevronDownIcon />
          </span>
        </Container>
      )}
      {isOpen ? (
        <SuspenseMenu
          ref={modalRef}
          width={instance.getColWidth(col) - 20}
          top={td?.offsetTop}
          showMenu={showMenu}
        >
          {type === "radio" ? (
            <CustomRadio
              options={options ?? [""]}
              value={newValue[0]}
              handleGetNewValue={(item: any) => {
                setNewValue([item]);
                // handleSetNewValue(item);
              }}
            />
          ) : type === "list" ? (
            <Select>
              {options?.map((option) => {
                return (
                  <Item
                    onClick={() => {
                      // handleSetNewValue(option);
                      setNewValue([option]);
                      setIsOpen(false);
                      instance.setDataAtRowProp(row, prop, [option]);
                    }}
                  >
                    {option}
                  </Item>
                );
              })}
            </Select>
          ) : (
            <CustomCheckBox
              options={options ?? [""]}
              defaultCheckedList={value}
              handleGetNewValue={(e: any) => {
                setNewValue(e);
                // handleSetNewValue(e);
              }}
            />
          )}
        </SuspenseMenu>
      ) : (
        <></>
      )}
    </ImageContextProvider>
  );
};
