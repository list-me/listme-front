/* eslint-disable */
import { useContext, useEffect, useRef, useState } from "react";
import {debounce} from "lodash";

import { Contents, Item } from "./styles"
import {ReactComponent as ChevronDownIcon} from "../../assets/chevron-down.svg";
import {ReactComponent as EyeOffIcon} from "../../assets/eye-off.svg";
import {ReactComponent as FilterIcon} from "../../assets/filter.svg";
import {ReactComponent as SearchIcon} from "../../assets/search.svg";
import {ReactComponent as HelpIcon} from "../../assets/help.svg";
import {ReactComponent as MenuIcon} from "../../assets/menu.svg";
import DropdownMenu from "../RepDropdownMenu";
import {Input} from "../Input";
import Modal from "../Modal";

interface IProps {
  options?: any[];
}

export const Temp: React.FC<IProps> = ({options}) => {
  const iconRef = useRef(null);
  const searchRef = useRef(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onSearch, setOnSearch] = useState<boolean>(false);
 
  useEffect(() => {
    window.addEventListener("keydown", function (e) {             
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {        
          e.preventDefault();
          setOnSearch(true);
      };
    })
  }, []);

  return (
    <Contents>
      {/* <Modal /> */}
      <DropdownMenu
        left={150}
        key={Math.random()}
        iconRef={iconRef}
        handleOpen={() => setIsOpen(false) }
        isOpen={isOpen}
        colHeaders={options}
      />
      <Item>
        <MenuIcon />
        Visualização
      </Item>
      <Item>
        <EyeOffIcon />
        Colunas Ocultas
        <ChevronDownIcon ref={iconRef} onClick={() => setIsOpen(!isOpen)} />
      </Item>
      <Item>
        <FilterIcon />
        Filtrar
      </Item>
      <Item
        ref={searchRef}
        onClick={() => setOnSearch(true)}
      >
        <SearchIcon onClick={() => setOnSearch(!onSearch)} />
        {
          !onSearch ?
            "Buscar" :
            <Input
              label={false}
              name="search"
              type="input"
              autoFocus
            />
          }
      </Item>
    </Contents>
  )
}