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

function IntegrationNavigate({
  external,
  toClear,
  onSave,
  isDisabled,
  done,
}: {
  external: boolean;
  toClear: () => void;
  onSave: () => void;
  isDisabled: boolean;
  done: boolean;
}): JSX.Element {
  return (
    <ContainerIntegrationNavigate external={external}>
      <ClearButtonIntegration onClick={toClear} disabled={done}>
        <ClearIcon />
        Limpar configurações de Características
      </ClearButtonIntegration>
      <RightButtons>
        {/* colocar botao de testar */}
        <SaveButton>
          <NavigationButton onClick={onSave} disabled={isDisabled}>
            Salvar
          </NavigationButton>
        </SaveButton>
      </RightButtons>
    </ContainerIntegrationNavigate>
  );
}

export default IntegrationNavigate;
