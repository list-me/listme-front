import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { useFromToContext } from "../../../../../context/FromToContext";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import { ContainerLinkedListSelector, ContentLinkMethod } from "./styles";
import TableLinkedListSelector from "./components/TableLinkedListSelector";
import { IPaginationTemplate } from "../../../../../pages/templates/templates";
import { templateRequests } from "../../../../../services/apis/requests/template";
import PaginationTablePublicListListComponent from "../../PublicList/PublicListList/components/PaginationTablePublicListList";

function LinkedListSelector(): JSX.Element {
  const { templates, setTemplates } = useFromToContext();
  const [currentTotalItems, setCurrentTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleGetTemplates = useCallback(
    async ({
      page,
      limit,
      is_public,
      sort,
      name,
      category_id,
    }: IPaginationTemplate) => {
      try {
        const { data, total } = await templateRequests.listPublicList({
          limit,
          page,
          is_public,
          sort,
          name,
          category_id,
        });
        setCurrentTotalItems(total);
        setTemplates(data);
      } catch (error) {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      }
    },
    [setTemplates],
  );

  const {
    setFromToIsOpened,
    setCurrentStep,
    currentLinkMethodValue,
    setCurrentLinkMethodValue,
  } = useFromToContext();

  useEffect(() => {
    const windowHeight = window.innerHeight - 431;
    const count = Math.floor(windowHeight / 57);
    handleGetTemplates({
      page: currentPage - 1,
      limit: count,
      is_public: true,
    });
  }, [currentPage, handleGetTemplates]);

  return (
    <ContainerLinkedListSelector>
      <BoxFromTo style={{ width: "100%" }}>
        <HeaderModal borderDisabled>
          <TitleModal>Selecione a List vinculada para gerenciar</TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <ContentLinkMethod>
          <TableLinkedListSelector currentList={templates} />
          <PaginationTablePublicListListComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(currentTotalItems / 7)}
          />
        </ContentLinkMethod>
      </BoxFromTo>
    </ContainerLinkedListSelector>
  );
}

export default LinkedListSelector;
