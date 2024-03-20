import { useEffect } from "react";
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
import PaginationSidebarError from "./components/PaginationSidebarError";

function SidebarError({
  errors,
  setSidebarErrorOpened,
  limit,
  offset,
  total,
  setOffset,
  setSearchIntegration,
  setSearchSwitch,
}: {
  setSearchIntegration: React.Dispatch<React.SetStateAction<string>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  offset: number;
  total: number;
  errors: IErrorsIntegrations;
  setSidebarErrorOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchSwitch: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const errorsData = errors.data;
  useEffect(() => {
    return () => {
      setOffset(0);
    };
  }, [setOffset]);
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
            <CardSidebarError
              error={currentError}
              setSearchIntegration={setSearchIntegration}
              setSearchSwitch={setSearchSwitch}
            />
          </>
        ))}
      </ContainerListCardsSidebarError>
      <PaginationSidebarError
        limit={limit}
        offset={offset}
        total={total}
        onPageChange={setOffset}
      />
    </ContainerSidebarError>
  );
}

export default SidebarError;
