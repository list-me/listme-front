import React, { useEffect, useState } from "react";
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

const PublicListList: React.FC = () => {
  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectFilter, setSelectFilter] = useState({
    label: "Mais recente",
    value: "created_at",
  });
  const [currentCategoryId, setCurrentCategoryId] = useState("");

  const [searchText, setSearchText] = useState("");
  const currentList = templates?.length ? splitIntoSublists(templates, 7) : [];
  const debouncedInputValue = useDebounce(searchText, 250);

  function splitIntoSublists<T>(list: T[], sublistSize: number): T[][] {
    const sublists: T[][] = [];
    for (let i = 0; i < list.length; i += sublistSize) {
      const sublist = list.slice(i, i + sublistSize);
      sublists.push(sublist);
    }
    return sublists;
  }

  const handleGetTemplates = async ({
    page,
    limit,
    is_public,
    sort,
    name,
    category_id,
  }: IPaginationTemplate): Promise<void> => {
    await templateRequests
      .listPublicList({ limit, page, is_public, sort, name, category_id })
      .then((response) => {
        setTemplates(response);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      });
  };

  useEffect(() => {
    setCurrentPage(1);
    handleGetTemplates({
      page: 0,
      limit: 1000,
      is_public: true,
      sort: selectFilter.value,
      name: debouncedInputValue,
    });
  }, [currentCategoryId, debouncedInputValue, selectFilter.value]);

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
        <TablePublicListList
          currentList={currentList}
          currentPage={currentPage}
        />
        <PaginationTablePublicListListComponent
          currentList={currentList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentPublicListList>
    </ContainerPublicListList>
  );
};

export default PublicListList;
