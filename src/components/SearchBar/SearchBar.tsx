/* eslint-disable import/prefer-default-export */
import React from "react";

import { ButtonCustom, Container } from "./styles";
import { Input } from "../Input";

interface ISearchBarProps {
  handleChangeInput: Function;
  onPressEnter: (e: any) => void;
  onFocus: boolean;
}

export const SearchBar: React.FC<ISearchBarProps> = ({
  handleChangeInput,
  onPressEnter,
  onFocus,
}) => {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          name="search"
          type="input"
          autoFocus={onFocus}
          handleCustomChange={(value: string) => {
            handleChangeInput(value);
          }}
          background
          onPressEnter={onPressEnter}
          height="39px"
        />
        <ButtonCustom height="35px" width="70px" onClick={onPressEnter}>
          Buscar
        </ButtonCustom>
      </div>
    </Container>
  );
};
