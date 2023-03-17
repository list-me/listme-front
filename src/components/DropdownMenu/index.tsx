import { Divider } from "antd";
import { useEffect, useRef, useState } from "react";
import {DropdownMenuProps} from "./DropdownMenu.d";
import { Container, SuspenseMenu, Item } from "./styles";
import {ReactComponent as PencilIcon} from "../../assets/pencei-icon.svg";
import {ReactComponent as CopyIcon} from "../../assets/copy-icon.svg";

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  changeOpen = () => {},
  isOpen,
  icoRef,
  openModal = () => {},
  options,
  left,
  setIsOpen = () => {}
}) => {
  const modalRef = useRef(null);
  const [leftItem, setLeftItem] = useState<number|null>(null);
  const onClose = (): void => changeOpen(); 

  const variable = []

  useEffect(() => {
    const handleScroll = (e) => {
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
                      <Divider style={{marginTop: "20px", marginBottom:"4px"}} key={item?.label} />
                      <Item
                        key={item?.label}
                        onClick={() => openModal(item)}
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
                      key={item?.label}
                      onClick={() => openModal(item)}
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