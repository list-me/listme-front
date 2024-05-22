import { useState } from "react";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { useFromToContext } from "../../../../../context/FromToContext";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import {
  AlertDeleteLinks,
  ContainerDeleteLinks,
  ContentDeleteLinks,
  InputToDelete,
} from "./styles";
import { Button, ButtonCotainer } from "../../../../Confirmation/styles";
import { ReactComponent as TrashIcon } from "../../../../../assets/trash-white.svg";

function DeleteLinks(): JSX.Element {
  const { setFromToIsOpened } = useFromToContext();

  const [value, setValue] = useState("");

  return (
    <ContainerDeleteLinks>
      <BoxFromTo style={{ width: "100%" }}>
        <HeaderModal borderDisabled>
          <TitleModal>Excluir vínculos</TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <ContentDeleteLinks>
          <AlertDeleteLinks>
            <span>Atenção!</span> Ao excluir os vínculos dos atributos esta ação
            será
            <br />
            irreversível, tem certeza que deseja excluir vínculos?
          </AlertDeleteLinks>
          <InputToDelete>
            <p>
              Digite o <span>excluir</span> para confirmar
            </p>
            <input
              type="text"
              id="delete"
              placeholder="excluir"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </InputToDelete>
        </ContentDeleteLinks>
        <ButtonCotainer>
          <Button
            backgroundColor="#E9ECEF"
            color="#868E96"
            type="button"
            onClick={() => ""}
          >
            Cancel
          </Button>
          <Button
            backgroundColor="#FA5252"
            color="#FFFF"
            disabled={value !== "excluir"}
            onClick={() => ""}
          >
            <TrashIcon />
            Excluir
          </Button>
        </ButtonCotainer>
      </BoxFromTo>
    </ContainerDeleteLinks>
  );
}

export default DeleteLinks;
