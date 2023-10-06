import React, { useState } from "react";
import {
  ColumnTitleLinkFields,
  ContainerLinkFields,
  ContentLinkFields,
  ContentRowLinkFields,
  HeaderLinkFields,
} from "./styles";
import Origin from "./components/Origin";
import SelectComponent from "../../../Select";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import { useFromToContext } from "../../../../context/FromToContext";

function LinkFields(): JSX.Element {
  const [select, setSelect] = useState();
  const { setCurrentStep, setFromToIsOpened } = useFromToContext();
  const options = [
    {
      value: "Adicionar novos e atualizar os existentes",
      label: "Adicionar novos e atualizar os existentes",
    },
    { value: "Apenas adicionar novos", label: "Apenas adicionar novos" },
    {
      value: "Apenas atualizar existentes",
      label: "Apenas atualizar existentes",
    },
  ];

  const arr = new Array(10).fill("");

  return (
    <ContainerLinkFields>
      <HeaderLinkFields>
        <ColumnTitleLinkFields>Origem</ColumnTitleLinkFields>
        <ColumnTitleLinkFields>Destino</ColumnTitleLinkFields>
      </HeaderLinkFields>
      <ContentLinkFields>
        {arr.map((item) => (
          <ContentRowLinkFields key={item}>
            <Origin />
            <SelectComponent
              select={select}
              onChange={setSelect}
              options={options}
              placeHolder="Selecione"
              small
            />
          </ContentRowLinkFields>
        ))}
      </ContentLinkFields>
      <BoxButtons>
        <NavigationButton
          abort
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Voltar
        </NavigationButton>
        <NavigationButton onClick={() => setFromToIsOpened(false)}>
          Importar
        </NavigationButton>
      </BoxButtons>
    </ContainerLinkFields>
  );
}

export default LinkFields;
