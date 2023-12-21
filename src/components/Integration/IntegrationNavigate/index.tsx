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
import { IMenuActivated } from "../../../pages/companyIntegration/companyIntegration";

function IntegrationNavigate({
  nextMenu,
  setNextMenu,
  external,
}: {
  nextMenu: {
    value: IMenuActivated;
    label: string;
  } | null;
  setNextMenu: React.Dispatch<React.SetStateAction<IMenuActivated>>;
  external: boolean;
}): JSX.Element {
  return (
    <ContainerIntegrationNavigate external={external}>
      <ClearButtonIntegration>
        <ClearIcon />
        Limpar configurações de Características
      </ClearButtonIntegration>
      <RightButtons>
        {nextMenu !== null && (
          <NextButton onClick={() => setNextMenu(nextMenu.value)}>
            {nextMenu.label}
            <RightArrowIcon />
          </NextButton>
        )}
        <SaveButton>
          <NavigationButton>Salvar</NavigationButton>
        </SaveButton>
      </RightButtons>
    </ContainerIntegrationNavigate>
  );
}

export default IntegrationNavigate;
