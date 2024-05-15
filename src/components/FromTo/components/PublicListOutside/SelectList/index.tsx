import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { useFromToContext } from "../../../../../context/FromToContext";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import { ReactComponent as CopyIcon } from "../../../../../assets/copy-outside.svg";
import { ReactComponent as AddIcon } from "../../../../../assets/add-outside.svg";
import {
  ContainerButtons,
  ContainerItemLinkMethod,
  ContainerLinkMethod,
  ItemLinkMethod,
  ContentLinkMethod,
  ContentTitleLinkMethod,
} from "./styles";
import { BoxButtons, NavigationButton } from "../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import SelectComponent from "../../../../Select";
import { templateRequests } from "../../../../../services/apis/requests/template";
import { IPaginationTemplate } from "../../../../../pages/templates/templates";
import { useProductContext } from "../../../../../context/products";

function SelectList(): JSX.Element {
  const [selectedTemplate, setSelectedTemplate] = useState<{
    value: string;
    label: string;
  }>({} as any);
  const [templates, setTemplates] = useState([]);

  const toOptions = templates.map((item: any) => {
    return { label: item.name, value: item.id };
  });
  const { setFromToIsOpened, setCurrentStep, currentLinkMethodValue } =
    useFromToContext();
  const { setTemplate } = useProductContext();

  const handleGetTemplates = ({ page, limit }: IPaginationTemplate): void => {
    templateRequests
      .list({ limit, page, list: true })
      .then((response) => {
        setTemplates(response);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetTemplates({ page: 0, limit: 100 });
  }, []);

  function onContinue(): void {
    const templateFinded = (templates as any).find((item: any) => {
      return item.id === selectedTemplate.value;
    });
    setTemplate(templateFinded);
    setCurrentStep(4);
  }

  return (
    <ContainerLinkMethod>
      <BoxFromTo>
        <HeaderModal borderDisabled>
          <TitleModal>Selecionar List existente</TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <SelectComponent
          select={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e)}
          options={toOptions}
          placeHolder="Selecionar"
        />
        <ContainerButtons>
          <BoxButtons>
            <NavigationButton
              abort
              prev
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
            >
              Voltar
            </NavigationButton>
            <NavigationButton
              disabled={!currentLinkMethodValue}
              onClick={() => {
                onContinue();
              }}
            >
              <PlusIcon />
              Continuar
            </NavigationButton>
          </BoxButtons>
        </ContainerButtons>
      </BoxFromTo>
    </ContainerLinkMethod>
  );
}

export default SelectList;
