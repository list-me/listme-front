import { Divider } from "antd";
import { useContext, useEffect, useRef } from "react";
import { productContext } from "../../context/products";
import {DropdownMenuProps} from "./DropdownMenu.d";
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
  template
}) => {
  const modalRef = useRef(null);
  const variable = [];

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen()
    }

    function handleOutsideClick(event) {
      if (icoRef.current && icoRef.current!.contains(event.target)) {
        return;
      }

      if (modalRef.current && !modalRef.current!.contains(event.target)) {
        setIsOpen();
      }
    }
  
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('wheel', handleScroll);
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('wheel', handleScroll);
    };

  }, [modalRef]);

  return (
    <>
      {
        isOpen ? 
          <SuspenseMenu left={left} ref={modalRef}>
            {
              options.map((item) => {
                if (variable.length === 2) {
                  variable.pop()
                  return (
                    <>
                      <Divider style={{marginTop: "20px", marginBottom:"4px"}} key={Math.random()} />
                      <Item
                        className="item"
                        key={Math.random()}
                        onClick={(e) => {
                          openModal(item, col)
                        }}
                      >
                        {item?.icon}
                        {item?.label}
                      </Item>
                  </>
                  )
                }

                variable.push("ok")
                return (
                  <>
                    <Item
                      className="item"
                      key={item?.label}
                      onClick={() => {
                        openModal(item, col)
                      }}
                    >
                      {item?.icon}
                      {item?.label}
                    </Item>
                  </>
                )
              })
            }
          </SuspenseMenu> :
          <> </>
      }
    </>
  );
}