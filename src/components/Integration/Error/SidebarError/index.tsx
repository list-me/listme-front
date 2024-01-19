import { useState } from "react";
import {
  CloseButtonSidebarError,
  ContainerListCardsSidebarError,
  ContainerSidebarError,
  HeaderSidebarError,
  TitleHeaderSidebarError,
} from "./styles";
import { ReactComponent as CloseIcon } from "../../../../assets/close-gray.svg";
import CardSidebarError from "./components/CardSidebarError";
import { IErrorsIntegrations } from "../../../../context/IntegrationContext/IntegrationContext";

function SidebarError({
  errors,
  setSidebarErrorOpened,
}: {
  errors: IErrorsIntegrations;
  setSidebarErrorOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const errorsData = errors.data;
  return (
    <ContainerSidebarError>
      <HeaderSidebarError>
        <TitleHeaderSidebarError>Falhas na integração</TitleHeaderSidebarError>
        <CloseButtonSidebarError onClick={() => setSidebarErrorOpened(false)}>
          <CloseIcon />
        </CloseButtonSidebarError>
      </HeaderSidebarError>
      <ContainerListCardsSidebarError>
        {errorsData.map((currentError) => (
          <>
            <CardSidebarError error={currentError} />
          </>
        ))}
      </ContainerListCardsSidebarError>
    </ContainerSidebarError>
  );
}

export default SidebarError;
