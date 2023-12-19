import React from "react";
import {
  ClearButtonIntegration,
  ContainerIntegrationNavigate,
  NextButton,
  RightButtons,
  SaveButton,
} from "./styles";
import { NavigationButton } from "../../NavigationButton/styles";

import { ReactComponent as RightArrowIcon } from "../../../assets/right-arrow-small.svg";
import { ReactComponent as ClearIcon } from "../../../assets/clear.svg";

function IntegrationNavigate(): JSX.Element {
  return (
    <ContainerIntegrationNavigate>
      <ClearButtonIntegration>
        <ClearIcon />
        Limpar configurações de Características
      </ClearButtonIntegration>
      <RightButtons>
        <NextButton>
          Config. de Produtos
          <RightArrowIcon />
        </NextButton>
        <SaveButton>
          <NavigationButton>Salvar</NavigationButton>
        </SaveButton>
      </RightButtons>
    </ContainerIntegrationNavigate>
  );
}

export default IntegrationNavigate;
