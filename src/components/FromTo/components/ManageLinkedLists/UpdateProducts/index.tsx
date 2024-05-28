import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import {
  AlertDeleteLinks,
  ContainerDeleteLinks,
  ContentDeleteLinks,
} from "./styles";
import { Button, ButtonCotainer } from "../../../../Confirmation/styles";
import { ReactComponent as TrashIcon } from "../../../../../assets/trash-white.svg";
import { BoxButtons, NavigationButton } from "../../NavigationButton/styles";

function UpdateProducts({
  setIsOpened,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <ContainerDeleteLinks>
      <BoxFromTo style={{ width: "100%" }}>
        <HeaderModal borderDisabled>
          <TitleModal>Atualizar List</TitleModal>
          <CloseButton onClick={() => setIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <ContentDeleteLinks>
          <AlertDeleteLinks>
            <span>Atenção!</span> Você tem certeza que deseja atualizar List?
          </AlertDeleteLinks>
        </ContentDeleteLinks>
        <BoxButtons>
          <NavigationButton onClick={() => setIsOpened(false)} abort>
            Cancelar
          </NavigationButton>
          <NavigationButton onClick={() => ""}>
            <PlusIcon />
            Atualizar List
          </NavigationButton>
        </BoxButtons>
      </BoxFromTo>
    </ContainerDeleteLinks>
  );
}

export default UpdateProducts;
