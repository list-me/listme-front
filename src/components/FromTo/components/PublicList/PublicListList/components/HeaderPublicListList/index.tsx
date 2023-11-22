import React from "react";
import {
  CotainerSelectPublicListList,
  HeaderPublicListList,
  TitlePublicListList,
} from "./styles";
import SelectComponent from "../../../../../../Select";

// import { Container } from './styles';

const HeaderPublicListListComponent: React.FC = () => {
  return (
    <HeaderPublicListList>
      <TitlePublicListList>Lists públicas</TitlePublicListList>
      <CotainerSelectPublicListList>
        <SelectComponent
          small
          select={{ label: "Mais recente", value: "Mais recente" }}
          onChange={() => ""}
          options={[
            { label: "Mais recente", value: "Mais recente" },
            { label: "Ordem alfabética", value: "Ordem alfabética" },
            {
              label: "Preço: Maior para Menor",
              value: "Preço: Maior para Menor",
            },
            {
              label: "Preço: Menor para Maior",
              value: "Preço: Menor para Maior",
            },
          ]}
          placeHolder=""
        />
      </CotainerSelectPublicListList>
    </HeaderPublicListList>
  );
};

export default HeaderPublicListListComponent;
