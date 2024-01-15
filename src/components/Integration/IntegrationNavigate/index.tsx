import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ClearButtonIntegration,
  ContainerIntegrationNavigate,
  NextButton,
  RightButtons,
  SaveButton,
} from "./styles";
import { NavigationButton } from "../../NavigationButton/styles";

import { ReactComponent as ClearIcon } from "../../../assets/clear.svg";
import { ROUTES } from "../../../constants/routes";

function IntegrationNavigate({
  external,
  toClear,
}: {
  external: boolean;
  toClear: () => void;
}): JSX.Element {
  return (
    <ContainerIntegrationNavigate external={external}>
      <ClearButtonIntegration onClick={toClear}>
        <ClearIcon />
        Limpar configurações de Características
      </ClearButtonIntegration>
      <RightButtons>
        <SaveButton>
          <NavigationButton>Salvar</NavigationButton>
        </SaveButton>
      </RightButtons>
    </ContainerIntegrationNavigate>
  );
}

export default IntegrationNavigate;
