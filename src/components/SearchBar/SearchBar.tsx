/* eslint-disable import/prefer-default-export */
import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

import { ButtonCustom, Container } from "./styles";
import { Input } from "../Input";

interface ISearchBarProps {
  handleChangeInput: Function;
  onPressEnter: Function;
}

export const SearchBar: React.FC<ISearchBarProps> = ({
  handleChangeInput,
  onPressEnter,
}) => {
  const [onSearch, setOnSearch] = useState<boolean>(false);

  const variants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -500, opacity: 0, transition: { duration: 1 } },
  };

  return (
    <Container>
      {/* <AnimatePresence> */}
      {/* {onSearch ? ( */}
      <div
        //   initial="closed"
        //   animate="open"
        //   exit="closed"
        //   variants={variants}
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
          handleCustomChange={(value: string) => {
            handleChangeInput(value);
          }}
          background
          onPressEnter={() => onPressEnter()}
          height="39px"
        />
        <ButtonCustom
          height="35px"
          width="70px"
          //   onClick={() => handleSearch(filter)}
        >
          Buscar
        </ButtonCustom>
      </div>
      {/* ) : (
        <span onClick={() => setOnSearch(!onSearch)}>Buscar</span>
      )} */}
      {/* </AnimatePresence> */}
      {/* <div>
        <SearchIcon onClick={() => setOnSearch(!onSearch)} />
      </div> */}
    </Container>
  );
};
