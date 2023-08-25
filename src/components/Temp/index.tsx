/* eslint-disable */
import { useContext, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import { ButtonCustom, Contents, Item } from "./styles";
import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down.svg";
import { ReactComponent as EyeOffIcon } from "../../assets/eye-off.svg";
import { ReactComponent as FilterIcon } from "../../assets/filter.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import DropdownMenu from "../RepDropdownMenu";
import { Input } from "../Input";
import Modal from "../Modal";
import { productContext } from "../../context/products";
import Button from "../Button";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  options?: any[];
  handleSearch: Function;
}

export const Temp: React.FC<IProps> = ({
  options,
  handleSearch = () => {},
}) => {
  const iconRef = useRef(null);
  const searchRef = useRef(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const variants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0, transition: { duration: 1 } },
  };
  // const handleCustomChange = debounce((newValue: string) => {
  //   handleSetFilter(newValue);
  // }, 200);

  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        e.preventDefault();
        setOnSearch(true);
      }
    });
  }, []);

  return (
    <Contents>
      {/* <Modal /> */}
      <DropdownMenu
        left={150}
        key={Math.random()}
        iconRef={iconRef}
        handleOpen={() => setIsOpen(false)}
        isOpen={isOpen}
        colHeaders={options ?? []}
      />
      <Item>
        <MenuIcon />
        Visualização
      </Item>
      <Item ref={iconRef} onClick={() => setIsOpen(!isOpen)}>
        <EyeOffIcon />
        Colunas Ocultas
        <ChevronDownIcon ref={iconRef} />
      </Item>
      <Item>
        <FilterIcon />
        Filtrar
      </Item>
      <Item ref={searchRef}>
        <SearchIcon onClick={() => setOnSearch(!onSearch)} />
        <AnimatePresence>
          {onSearch ? (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={variants}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Input
                name="search"
                type="input"
                autoFocus
                handleCustomChange={setFilter}
                background
                onPressEnter={() =>
                  handleSearch(filter, window.location.pathname.substring(10))
                }
                height="39px"
              />
              <ButtonCustom
                height="37px"
                width="85px"
                onClick={() =>
                  handleSearch(filter, window.location.pathname.substring(10))
                }
              >
                Buscar
              </ButtonCustom>
            </motion.div>
          ) : (
            <span onClick={() => setOnSearch(!onSearch)}>Buscar</span>
          )}
        </AnimatePresence>
      </Item>
    </Contents>
  );
};
