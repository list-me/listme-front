import React, { useEffect, useRef, useState } from "react";
import { ContainerLoading, ContainerModal, ContentLoading } from "./styles";
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
import LoadingSpinner from "../../../LoadingSpinner";

function StepLoading({
  setIsOpened,
  onFinish,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish: () => void;
}): JSX.Element {
  const hasFinished = useRef(false);

  useEffect(() => {
    if (!hasFinished.current) {
      onFinish();
      hasFinished.current = true;
    }
  }, [onFinish]);

  return (
    <ContainerModal>
      <ContainerLoading>
        <BoxFromTo style={{ width: "100%" }}>
          <HeaderModal borderDisabled>
            <TitleModal>Atualizar List</TitleModal>
            <CloseButton onClick={() => setIsOpened(false)}>
              <CloseIcon />
            </CloseButton>
          </HeaderModal>
          <ContentLoading>
            <LoadingSpinner
              text="Atualizando..."
              subText="Em breve seu catálogo estará atualizado"
            />
          </ContentLoading>
          <BoxButtons>
            <NavigationButton onClick={() => ""} disabled abort>
              Cancelar
            </NavigationButton>
            <NavigationButton onClick={() => ""} disabled abort>
              <PlusIcon />
              Atualizar List
            </NavigationButton>
          </BoxButtons>
        </BoxFromTo>
      </ContainerLoading>
    </ContainerModal>
  );
}

export default StepLoading;
