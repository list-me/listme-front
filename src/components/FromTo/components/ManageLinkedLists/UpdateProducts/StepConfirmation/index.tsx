import React from "react";
import {
  AlertConfirmation,
  ContainerConfirmation,
  ContainerModal,
  ContentConfirmation,
} from "./styles";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../../styles";
import {
  BoxButtons,
  NavigationButton,
} from "../../../../../NavigationButton/styles";
import { ReactComponent as CloseIcon } from "../../../../../../assets/close-gray.svg";
import { ReactComponent as PlusIcon } from "../../../../../../assets/plus-fromto.svg";

function StepConfirmation({
  setIsOpened,
  onClick,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}): JSX.Element {
  return (
    <ContainerModal>
      <ContainerConfirmation>
        <BoxFromTo style={{ width: "100%" }}>
          <HeaderModal borderDisabled>
            <TitleModal>Atualizar List</TitleModal>
            <CloseButton onClick={() => setIsOpened(false)}>
              <CloseIcon />
            </CloseButton>
          </HeaderModal>
          <ContentConfirmation>
            <AlertConfirmation>
              <span>Atenção!</span> Você tem certeza que deseja atualizar List?
            </AlertConfirmation>
          </ContentConfirmation>
          <BoxButtons>
            <NavigationButton onClick={() => setIsOpened(false)} abort>
              Cancelar
            </NavigationButton>
            <NavigationButton onClick={onClick}>
              <PlusIcon />
              Atualizar List
            </NavigationButton>
          </BoxButtons>
        </BoxFromTo>
      </ContainerConfirmation>
    </ContainerModal>
  );
}

export default StepConfirmation;
