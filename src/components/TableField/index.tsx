/* eslint-disable */

import React, { useCallback, useContext, useRef, useState } from "react";
import _ from "lodash";

import { useEffect } from "react";
import { Divider } from "antd";
import { ITableFieldProps } from "./TableField.d";
import {
  CellContent,
  Container,
  Footer,
  Item,
  Select,
  SuspenseMenu,
} from "./styles";
import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down.svg";
import { ReactComponent as PencilIcon } from "../../assets/pencei-icon.svg";
import { CustomRadio } from "../Radio";
import { CustomCheckBox } from "../CustomCheckBox";
import Dropzone from "../Dropzone";
import { ImageContextProvider } from "../../context/images";
import { Relation } from "./Relation";
import { productContext } from "../../context/products";

export const TableField: React.FC<any> = ({
  value,
  type,
  options,
  handleSetNewValue = () => {},
  col,
  instance,
  prop,
  td,
  column,
  currentItem,
  className,
  dataProvider,
  row,
  cellProperties,
  bucket_url,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState<any[]>(
    value !== null ? value : [""],
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const { handleSave } = useContext(productContext);

  // const handleAccertOptions = (options: string[]) => {
  //   return options.map((option) => {
  //     return {
  //       label: option[0].toUpperCase() + option.substring(1),
  //       value: option,
  //     };
  //   });
  // };

  useEffect(() => {
    if (value !== null || value !== undefined) {
      setNewValue(value);
    } else {
      setNewValue([""]);
    }
  }, []);

  const handleGetTemplateId = (column: any): string => {
    return column?.options[0]?.templateId;
  };

  const handleGetField = (column: any): string => {
    return column?.options[0]?.field;
  };

  const handleChangeValue = useCallback(
    (newValue: any, row?: number) => {
      instance.setDataAtRowProp(row, prop, newValue);
    },
    [instance, prop],
  );

  // const FIELD_TYPES = {
  //   file: (
  //     <Dropzone
  //       col={0}
  //       instance={instance}
  //       row={0}
  //       value={value}
  //       prop={column.data}
  //       // className={className}
  //       bucket_url={column?.bucket_url}
  //     />
  //   ),
  //   relation: (
  //     <Relation
  //       value={value?.filter((v) => v != undefined)}
  //       templateId={handleGetTemplateId(column)}
  //       field={handleGetField(column)}
  //       currentItem={currentItem}
  //       column={column}
  //       handleSave={(e: any) => handleChangeValue(e)}
  //       // className={className}
  //     />
  //   ),
  // };

  const onClose = (): void => {
    setIsOpen(false);

    // if (!(newValue !== value)) {
    //   return;
    // }

    // const updatedValue = typeof newValue === "object" ? newValue : [newValue];
    // instance.setDataAtRowProp(row, prop, updatedValue);
  };

  useEffect(() => {
    console.log("Custom renderizado by effect");
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
  }, [value, isOpen]);

  return (
    <ImageContextProvider>
      {["file", "relation"].includes(type) ? (
        type == "file" ? (
          <Dropzone
            col={0}
            instance={instance}
            row={row}
            value={value}
            prop={column.data}
            // className={className}
            bucket_url={bucket_url}
            dataProvider={dataProvider}
          />
        ) : (
          <Relation
            currentValue={
              value ? value?.filter((e: any) => e != undefined || e != "") : []
            }
            templateId={handleGetTemplateId(column)}
            field={handleGetField(column)}
            column={column}
            dataProvider={dataProvider}
            row={row}
          />
        )
      ) : (
        <CellContent isSearchResult={cellProperties?.isSearchResult ?? false}>
          <Container
            type={type}
            ref={elementRef}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <label>
              {newValue?.map((valueItem: string, index: number) => {
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
          {/* {className == "invalid-cell" ? (
            <label htmlFor="" className={className} />
          ) : (
            <></>
          )} */}
        </CellContent>
      )}
      {isOpen ? (
        <SuspenseMenu
          ref={modalRef}
          width={200}
          top={td?.offsetTop}
          showMenu={showMenu}
        >
          {type === "radio" ? (
            <CustomRadio
              options={options ?? [""]}
              value={newValue}
              handleGetNewValue={async (item: any) => {
                setIsOpen(false);
                setNewValue([item]);

                const newData = dataProvider;
                newData[row][prop] = [item];

                const id = await handleSave(newData[row]);
                if (id) dataProvider[row].id = id;
              }}
            />
          ) : type === "list" ? (
            <Select>
              {options?.map((option: any) => {
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
              defaultCheckedList={newValue}
              handleGetNewValue={(e: any) => {
                setNewValue(e);
                instance.setDataAtRowProp(row, prop, e);

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
