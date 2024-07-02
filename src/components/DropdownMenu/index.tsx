/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import { Divider } from "antd";
import React, { useEffect, useRef } from "react";
import { DropdownMenuProps } from "./DropdownMenu.d";
import { SuspenseMenu, Item } from "./styles";
import { useProductContext } from "../../context/products";

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  icoRef,
  openModal = () => {},
  options,
  setIsOpen = () => {},
  col,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const variable: string[] = [];
  const { headerTable } = useProductContext();
  const currentCol = headerTable.find((item) => {
    return +item.order === +col;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen();
    };

    function handleOutsideClick(event: any): void {
      if (icoRef.current && icoRef.current!.contains(event.target)) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("wheel", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [modalRef]);

  return (
    <>
      {isOpen ? (
        <SuspenseMenu ref={modalRef}>
          {options?.map((item) => {
            if (variable.length === 2) {
              variable.pop();
              return (
                <React.Fragment key={Math.random()}>
                  <Divider
                    style={{ marginTop: "20px", marginBottom: "4px" }}
                    key={Math.random()}
                  />
                  <Item
                    className="item"
                    key={Math.random()}
                    onClick={(_e) => {
                      if (!item?.label.toLowerCase().includes("excluir")) {
                        openModal(item, col);
                      } else if (
                        item?.action === "delete" &&
                        !currentCol?.default &&
                        !currentCol?.required
                      ) {
                        openModal(item, col);
                      }
                    }}
                    isLast={item?.label.toLowerCase().includes("excluir")}
                    isDisabled={
                      item?.action === "delete" &&
                      currentCol?.default &&
                      currentCol.required
                    }
                  >
                    {item?.icon}
                    {item?.label}
                  </Item>
                </React.Fragment>
              );
            }

            variable.push("ok");
            return (
              <React.Fragment key={Math.random()}>
                <Item
                  className="item"
                  key={item?.label}
                  onClick={() => {
                    if (!item?.label.toLowerCase().includes("excluir")) {
                      openModal(item, col);
                    } else if (
                      item?.action === "delete" &&
                      !currentCol?.default &&
                      !currentCol?.required
                    ) {
                      openModal(item, col);
                    }
                  }}
                  isLast={item?.action === "delete"}
                  // @ts-ignore
                  isDisabled={
                    item?.action === "delete" &&
                    currentCol?.default &&
                    currentCol.required
                  }
                >
                  {item?.icon}
                  {item?.label}
                </Item>
              </React.Fragment>
            );
          })}
        </SuspenseMenu>
      ) : (
        <> </>
      )}
    </>
  );
};
