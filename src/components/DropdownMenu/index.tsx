/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import { Divider } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { productContext } from "../../context/products";
import { DropdownMenuProps } from "./DropdownMenu.d";
import { SuspenseMenu, Item } from "./styles";

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  changeOpen = () => {},
  isOpen,
  icoRef,
  openModal = () => {},
  options,
  left,
  setIsOpen = () => {},
  col,
  template,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const variable: string[] = [];

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen();
    };

    function handleOutsideClick(event: any) {
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
        <SuspenseMenu left={left} ref={modalRef}>
          {options.map((item) => {
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
                    onClick={(e) => {
                      openModal(item, col);
                    }}
                    isLast={item?.label.toLowerCase().includes("excluir")}
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
                    openModal(item, col);
                  }}
                  isLast={item?.label.toLowerCase().includes("excluir")}
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
