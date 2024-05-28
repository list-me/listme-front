import React, { useEffect } from "react";
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
  setNext,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setNext: () => void;
}): JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
      setNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, [setNext]);

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
