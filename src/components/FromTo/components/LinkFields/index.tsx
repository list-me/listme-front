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
  const { setCurrentStep, setFromToIsOpened, colHeadersToPreviewTable, data } =
    useFromToContext();
  console.log("🚀 ~ file: index.tsx:17 ~ LinkFields ~ data:", data);
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

  return (
    <ContainerLinkFields>
      <HeaderLinkFields>
        <ColumnTitleLinkFields>Origem</ColumnTitleLinkFields>
        <ColumnTitleLinkFields>Destino</ColumnTitleLinkFields>
      </HeaderLinkFields>
      <ContentLinkFields>
        {colHeadersToPreviewTable?.map((item) => (
          <ContentRowLinkFields key={item}>
            <Origin title={item} example={data[0][item]} />
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
