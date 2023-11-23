import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ContainerPublicListList, ContentPublicListList } from "./styles";
import SidebarPublicListListComponent from "./components/SidebarPublicListList";
import HeaderPublicListListComponent from "./components/HeaderPublicListList";
import SearchPublicListListComponent from "./components/SearchPublicListList";
import { IPaginationTemplate } from "../../../../../pages/templates/templates";
import { templateRequests } from "../../../../../services/apis/requests/template";

import PaginationTablePublicListListComponent from "./components/PaginationTablePublicListList";
import useDebounce from "../../../../../hooks/useDebounce/useDebounce";
import TablePublicListList from "./components/TablePublicListList";
import { useFromToContext } from "../../../../../context/FromToContext";

function PublicListList(): JSX.Element {
  const { templates, setTemplates } = useFromToContext();
  const [currentPage, setCurrentPage] = useState(1);

  const [selectFilter, setSelectFilter] = useState({
    label: "Mais recente",
    value: "created_at",
  });
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentTotalItems, setCurrentTotalItems] = useState(0);

  const debouncedInputValue = useDebounce(searchText, 250);

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

  useEffect(() => {
    handleGetTemplates({
      page: currentPage - 1,
      limit: 7,
      is_public: true,
      sort: selectFilter.value,
      name: debouncedInputValue,
      category_id: currentCategoryId,
    });
  }, [
    currentCategoryId,
    currentPage,
    debouncedInputValue,
    handleGetTemplates,
    selectFilter.value,
  ]);

  return (
    <ContainerPublicListList>
      <SidebarPublicListListComponent
        setCurrentCategoryId={setCurrentCategoryId}
      />
      <ContentPublicListList>
        <HeaderPublicListListComponent
          selectFilter={selectFilter}
          setSelectFilter={setSelectFilter}
        />
        <SearchPublicListListComponent
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <TablePublicListList currentList={templates} />

        <PaginationTablePublicListListComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(currentTotalItems / 7)}
        />
      </ContentPublicListList>
    </ContainerPublicListList>
  );
}

export default PublicListList;
