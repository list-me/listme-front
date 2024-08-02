import React, { useCallback, useEffect, useState } from "react";
// eslint-disable-next-line import/no-cycle
import { ContainerButtons, ContainerModal, Text } from "./styles";
import DefaultInput from "../../DefaultInput";
import { NavigationButton } from "../../NavigationButton/styles";

// import { Container } from './styles';

function IAModalSelectItems({
  convertData,
  setTextSelectedToIa,
  textSelectedToIa,
}: {
  convertData({ data }: { data: string | number[] }): void;
  setTextSelectedToIa: React.Dispatch<React.SetStateAction<string>>;
  textSelectedToIa: string;
}): JSX.Element {
  // const [currentValue, setCurrentValue] = useState("");

  const handleChangeValue = useCallback(
    (value: string): void => {
      convertData({ data: value });
      setTextSelectedToIa(value);
    },
    [convertData, setTextSelectedToIa],
  );

  return (
    <ContainerModal>
      <div>
        <Text>Selec. ou digite o número da(s) linha(s)</Text>
        <DefaultInput
          label=""
          type=""
          value={textSelectedToIa}
          changeValue={handleChangeValue}
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
