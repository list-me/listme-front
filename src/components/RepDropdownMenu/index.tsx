import { Divider, Input, Switch } from "antd";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { IDropdownMenuProps } from "./RepDropdownMenu.d";
import { Container, Line } from "./styles";
import {ReactComponent as SearchIcon} from "../../assets/search-gray.svg";
import { productContext } from "../../context/products";

const DropdownMenu: React.FC<IDropdownMenuProps> = ({left, iconRef, handleOpen, isOpen, colHeaders}) => {
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const {handleHidden, hidden, template} = useContext(productContext);

  const customHidden = useCallback((item: any, state: boolean) => {
    return handleHidden(colHeaders.indexOf(item), template, state)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
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
              filteredItems.map((item, index) => {
                return (
                <Line>
                  <Switch size="small" onChange={(e) => {
                    customHidden(item, e);
                  }} checked={hidden.includes(colHeaders.indexOf(item))}/>
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