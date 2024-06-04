import { useCallback, useEffect, useState } from "react";
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
import { templateRequests } from "../../../../../services/apis/requests/template";

function DeleteLinks({
  setDataTemplate,
  template,
  setItems,
  dataTemplate,
  targetTemplate,
  deleteAll,
}: {
  deleteAll: boolean;
  template: any;
  setDataTemplate: any;
  setItems: any;
  dataTemplate: any;
  targetTemplate: any;
}): JSX.Element {
  const { setFromToIsOpened, setCurrentStep } = useFromToContext();

  const getTemplate = useCallback(
    async (id: string): Promise<void> => {
      const data = await templateRequests.get(id);
      setDataTemplate(data);
    },
    [setDataTemplate],
  );

  useEffect(() => {
    if (template.id && deleteAll) {
      getTemplate(template.id);
    }
  }, [deleteAll, getTemplate, template.id]);

  useEffect(() => {
    if (deleteAll) {
      const targetsIds = dataTemplate?.fields?.fields.map(
        (item: { target: string; is_sync: boolean }) => item.target,
      );

      const result = dataTemplate?.fields.fields.map(
        (item: { target: string; origin: string; is_sync: boolean }) => {
          return {
            target: item.target,
            is_sync: item.is_sync,
            origin: item.origin,
          };
        },
      );

      const targetsData = targetTemplate.fields.fields.filter((item: any) => {
        return targetsIds?.includes(item.id);
      });

      const itemsToReturn = result?.map((item: any, index: number) => {
        const objt = {
          ...item,
          name: targetsData[index].name,
        };
        return objt;
      });
      setItems(itemsToReturn);
    }
  }, [
    dataTemplate?.fields.fields,
    deleteAll,
    setItems,
    targetTemplate.fields.fields,
  ]);

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
            onClick={() => setCurrentStep(3)}
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
