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
  nextMenu,
  setNextMenu,
  external,
}: {
  nextMenu: {
    value: string;
    label: string;
  } | null;
  setNextMenu: React.Dispatch<React.SetStateAction<string>>;
  external: boolean;
}): JSX.Element {
  const location = useLocation();
  const pathnameSplited = location.pathname.split("/");
  const pathnameSize = pathnameSplited.length;

  return (
    <ContainerIntegrationNavigate external={external}>
      <ClearButtonIntegration>
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
