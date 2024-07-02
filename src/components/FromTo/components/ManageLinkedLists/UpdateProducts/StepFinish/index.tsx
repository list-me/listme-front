import React from "react";
import { ContainerFinish, ContainerModal, ContentFinish } from "./styles";
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
import {
  TextFinishedStep,
  ContentFinishedStep,
  TitleFinishedStep,
} from "../../../FinishedStep/styles";
import check from "../../../../../../assets/images/checkImage.png";

function StepFinish({
  setIsOpened,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <ContainerModal>
      <ContainerFinish>
        <BoxFromTo style={{ width: "100%" }}>
          <HeaderModal borderDisabled>
            <TitleModal>Atualizar List</TitleModal>
            <CloseButton onClick={() => setIsOpened(false)}>
              <CloseIcon />
            </CloseButton>
          </HeaderModal>
          <ContentFinishedStep>
            <img src={check} alt="Vincular lista pública" />
            <TitleFinishedStep>Sucesso!</TitleFinishedStep>
            <TextFinishedStep>
              Seu catálogo está sendo atualizado...
            </TextFinishedStep>
          </ContentFinishedStep>
          <BoxButtons>
            <NavigationButton onClick={() => setIsOpened(false)}>
              <PlusIcon />
              Concluir
            </NavigationButton>
          </BoxButtons>
        </BoxFromTo>
      </ContainerFinish>
    </ContainerModal>
  );
}

export default StepFinish;
