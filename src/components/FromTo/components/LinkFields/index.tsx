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
import { useProductContext } from "../../../../context/products";

function LinkFields(): JSX.Element {
  const [select, setSelect] = useState();
  const { setCurrentStep, setFromToIsOpened, colHeadersToPreviewTable, data } =
    useFromToContext();
  const { template } = useProductContext();

  const options = template.fields.fields.map((item: any) => {
    const newItem = { value: item.title, label: item.title, type: item.type };
    return newItem;
  });

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
              isSearchable
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
