import { Divider, Input, Switch } from "antd";
import { useEffect, useRef, useState } from "react";
import { IDropdownMenuProps } from "./RepDropdownMenu.d";
import { Container, Line } from "./styles";
import {ReactComponent as SearchIcon} from "../../assets/search-gray.svg";

const DropdownMenu: React.FC<IDropdownMenuProps> = ({left, iconRef, handleOpen, isOpen, colHeaders}) => {
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    console.log({colHeaders})

    setFilteredItems(colHeaders.filter(item => item.toLowerCase().includes(inputValue.toLowerCase())));

    const handleScroll = () => {
      handleOpen()
    }

    function handleOutsideClick(event) {
      if (iconRef.current && iconRef.current!.contains(event.target)) {
        return;
      }

      if (modalRef.current && !modalRef.current!.contains(event.target)) {
        handleOpen();
      }
    }
  
    document.addEventListener('mousedown', handleOutsideClick);
    // window.addEventListener('wheel', handleScroll);
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      // window.removeEventListener('wheel', handleScroll);
    };

  }, [modalRef, isOpen, inputValue]);

  return (
    <>
      {
        isOpen ?
          <Container left={left} ref={modalRef}>
            <Input bordered={false} placeholder="Buscar campos" addonAfter={<SearchIcon />} onChange={handleInputChange}/>
            <Divider style={{marginTop: "16px", marginBottom:"16px"}} />
            {
              filteredItems.map((item) => {
                return (
                <Line>
                  <Switch size="small" />
                  <label>{item}</label>
                </Line>
              )})
            }
          </Container> :
          <></>
      }
    </>
  );
}

export default DropdownMenu;