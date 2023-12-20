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
}: {
  nextMenu: {
    value: IMenuActivated;
    label: string;
  };
  setNextMenu: React.Dispatch<React.SetStateAction<IMenuActivated>>;
}): JSX.Element {
  return (
    <ContainerIntegrationNavigate>
      <ClearButtonIntegration>
        <ClearIcon />
        Limpar configurações de Características
      </ClearButtonIntegration>
      <RightButtons>
        <NextButton onClick={() => setNextMenu(nextMenu.value)}>
          {nextMenu.label}
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
