import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-cycle
import { ContainerButtons, ContainerModal, Text } from "./styles";
import DefaultInput from "../../DefaultInput";
import { NavigationButton } from "../../NavigationButton/styles";
import useDebounce from "../../../hooks/useDebounce/useDebounce";

// import { Container } from './styles';

function IAModalSelectItems({
  parseInputToList,
}: {
  parseInputToList: (input: string) => number[];
}): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 250);

  useEffect(() => {
    parseInputToList(debouncedInputValue);
  }, [debouncedInputValue, parseInputToList]);

  return (
    <ContainerModal>
      <div>
        <Text>Selec. ou digite o número da(s) linha(s)</Text>
        <DefaultInput
          label=""
          type=""
          value={inputValue}
          changeValue={setInputValue}
          required={false}
          placeHolder=""
          alertTitle=""
          alertContent=""
        />
      </div>
      <ContainerButtons>
        <NavigationButton abort>Cancelar</NavigationButton>
        <NavigationButton>Salvar</NavigationButton>
      </ContainerButtons>
    </ContainerModal>
  );
}

export default IAModalSelectItems;
