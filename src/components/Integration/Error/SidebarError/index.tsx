import {
  CloseButtonSidebarError,
  ContainerListCardsSidebarError,
  ContainerSidebarError,
  HeaderSidebarError,
  TitleHeaderSidebarError,
} from "./styles";
import { ReactComponent as CloseIcon } from "../../../../assets/close-gray.svg";
import CardSidebarError from "./components/CardSidebarError";

function SidebarError(): JSX.Element {
  return (
    <ContainerSidebarError>
      <HeaderSidebarError>
        <TitleHeaderSidebarError>Falhas na integração</TitleHeaderSidebarError>
        <CloseButtonSidebarError>
          <CloseIcon />
        </CloseButtonSidebarError>
      </HeaderSidebarError>
      <ContainerListCardsSidebarError>
        <CardSidebarError />
        <CardSidebarError />
        <CardSidebarError />
        <CardSidebarError />
        <CardSidebarError />
        <CardSidebarError />
      </ContainerListCardsSidebarError>
    </ContainerSidebarError>
  );
}

export default SidebarError;
