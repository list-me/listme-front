import { useCallback, useEffect, useState } from "react";
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
import { useProductContext } from "../../../../../context/products";
import UpdateProducts from "../UpdateProducts";

function LinkedListSelector({
  templates,
  setTemplates,
  setTemplateSelected,
}: {
  templates: any;
  setTemplates: React.Dispatch<React.SetStateAction<any>>;
  setTemplateSelected: React.Dispatch<React.SetStateAction<any>>;
}): JSX.Element {
  const { setFromToIsOpened } = useFromToContext();
  const [currentTotalItems, setCurrentTotalItems] = useState(0);
  const { template } = useProductContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [templatesSyncIds, setTemplatesSyncIds] = useState<string[]>([]);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);

  const handleGetTemplates = useCallback(
    async ({ page, limit }: IPaginationTemplate) => {
      try {
        const response = await templateRequests.listSync({
          id: template.id,
          page,
          limit,
        });
        setCurrentTotalItems(response.length);
        setTemplates(response);
      } catch (error) {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      }
    },
    [setTemplates, template.id],
  );

  useEffect(() => {
    handleGetTemplates({
      page: currentPage - 1,
      limit: 100,
    });
  }, [currentPage, handleGetTemplates, updateModalOpened]);

  return (
    <>
      <ContainerLinkedListSelector
        style={{ display: updateModalOpened ? "none" : "" }}
      >
        <BoxFromTo style={{ width: "100%" }}>
          <HeaderModal borderDisabled>
            <TitleModal>Selecione a List vinculada para gerenciar</TitleModal>
            <CloseButton onClick={() => setFromToIsOpened(false)}>
              <CloseIcon />
            </CloseButton>
          </HeaderModal>
          <ContentLinkMethod>
            <TableLinkedListSelector
              currentList={templates}
              setTemplateSelected={setTemplateSelected}
              setTemplatesSyncIds={setTemplatesSyncIds}
              setUpdateModalOpened={setUpdateModalOpened}
            />
            <PaginationTablePublicListListComponent
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={Math.ceil(currentTotalItems / 7)}
            />
          </ContentLinkMethod>
        </BoxFromTo>
      </ContainerLinkedListSelector>
      {updateModalOpened && (
        <UpdateProducts
          setIsOpened={setUpdateModalOpened}
          ids={templatesSyncIds}
        />
      )}
    </>
  );
}

export default LinkedListSelector;
