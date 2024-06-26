/* eslint-disable */
import { useContext, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import {
  ButtonCustom,
  ButtonFilter,
  Contents,
  CountFilter,
  Item,
} from "./styles";
import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down.svg";
import { ReactComponent as EyeOffIcon } from "../../assets/eye-off.svg";
import { ReactComponent as FilterIcon } from "../../assets/filter.svg";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";
import DropdownMenu from "../RepDropdownMenu";
import { Input } from "../Input";
import Modal from "../Modal";
import { productContext, useProductContext } from "../../context/products";
import Button from "../Button";
import { motion, AnimatePresence } from "framer-motion";
import { useFilterContext } from "../../context/FilterContext";
import { useIntegration } from "../../context/IntegrationContext";

interface IProps {
  options?: any[];
  handleSearch: Function;
  isPublic?: boolean;
}

export const Temp: React.FC<IProps> = ({
  options,
  handleSearch = () => {},
  isPublic,
}) => {
  const { setOpenedFilter, filterStatus } = useFilterContext();
  const { conditionsFilter } = useProductContext();
  const { searchIntegration, searchSwitch } = useIntegration();
  const iconRef = useRef(null);
  const searchRef = useRef(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const variants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0, transition: { duration: 1 } },
  };

  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (
        e.keyCode === 114 ||
        (e.ctrlKey && e.keyCode === 70) ||
        (e.metaKey && e.keyCode === 70)
      ) {
        e.preventDefault();
        setOnSearch(true);
      }
    });
  }, []);

  useEffect(() => {
    if (searchIntegration) {
      setOnSearch(true);
      setFilter(searchIntegration);
      handleSearch(searchIntegration, window.location.pathname.substring(10));
    }
  }, [searchIntegration, searchSwitch]);

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
      <Item isDisabled={isPublic}>
        <MenuIcon />
        Visualização
      </Item>
      <Item
        isDisabled={isPublic}
        ref={iconRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        <EyeOffIcon />
        Colunas Ocultas
        <ChevronDownIcon ref={iconRef} />
      </Item>
      <ButtonFilter
        isDisabled={isPublic}
        filterActive={filterStatus && !!conditionsFilter[0]?.action}
        onClick={() => setOpenedFilter(true)}
      >
        {filterStatus && !!conditionsFilter[0]?.action && (
          <CountFilter>{conditionsFilter.length}</CountFilter>
        )}
        <Item>
          <FilterIcon />
          Filtrar
        </Item>
      </ButtonFilter>
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
                value={filter}
                name="searchInput"
                type="text"
                autoFocus
                handleCustomChange={setFilter}
                background
                onPressEnter={() =>
                  handleSearch(
                    filter,
                    window.location.pathname.substring(isPublic ? 17 : 10),
                  )
                }
                height="39px"
                disabledValidade
              />
              <ButtonCustom
                height="37px"
                width="85px"
                onClick={() =>
                  handleSearch(
                    filter,
                    window.location.pathname.substring(isPublic ? 17 : 10),
                  )
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
