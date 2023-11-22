import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ContainerPublicListList,
  ContainerTablePublicListList,
  ContentPublicListList,
} from "./styles";
import SidebarPublicListListComponent from "./components/SidebarPublicListList";
import HeaderPublicListListComponent from "./components/HeaderPublicListList";
import SearchPublicListListComponent from "./components/SearchPublicListList";
import CustomTable from "../../../../Table";
import { IPaginationTemplate } from "../../../../../pages/templates/templates";
import { templateRequests } from "../../../../../services/apis/requests/template";
import formatDate from "../../../utils/formatDate";

import PaginationTablePublicListListComponent from "./components/PaginationTablePublicListList";
import useDebounce from "../../../../../hooks/useDebounce/useDebounce";
import { ReactComponent as LinkIcon } from "../../../../../assets/linkPublicList.svg";

const PublicListList: React.FC = () => {
  const columns = [
    {
      title: "Nome",
      key: "name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      render: (_: any, record: any) => {
        return <span className="defaultText">{record.name}</span>;
      },
    },
    {
      title: "Valor",
      key: "value",
      dataIndex: "value",
      render: (_: any, record: any) => {
        const amount = record.amount?.split(",").join("");
        const amountLocale = (+amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        if (record.amount)
          return <span className="blueText">{amountLocale}</span>;

        return <></>;
      },
    },
    {
      title: "Produtos",
      key: "products",
      dataIndex: "products",
      render: (_: any, record: any) => {
        const total =
          record.total >= 1000
            ? Number(record.total / 1000).toFixed(3)
            : record.total;
        return <span className="blueText">{total}</span>;
      },
    },
    {
      title: "Criado em",
      key: "created_at",
      dataIndex: "created_at",
      render: (_: any, record: any) => {
        return (
          <span className="grayText">{formatDate(record.created_at)}</span>
        );
      },
    },
    {
      title: "Última edição",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (_: any, record: any) => {
        return (
          <span className="grayText">{formatDate(record.updated_at)}</span>
        );
      },
    },
    {
      title: "Vincular",
      key: "link",
      dataIndex: "link",
      render: (_: any, _record: any) => {
        return (
          <div className="containerLinkIcon">
            <button type="button" className="boxLinkIcon">
              <LinkIcon />
            </button>
          </div>
        );
      },
    },
  ];

  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectFilter, setSelectFilter] = useState({
    label: "Mais recente",
    value: "created_at",
  });
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
  }: IPaginationTemplate): Promise<void> => {
    await templateRequests
      .listPublicList({ limit, page, is_public, sort, name })
      .then((response) => {
        setTemplates(response);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetTemplates({
      page: 0,
      limit: 1000,
      is_public: true,
      sort: selectFilter.value,
      name: debouncedInputValue,
    });
  }, [debouncedInputValue, selectFilter.value]);

  return (
    <ContainerPublicListList>
      <SidebarPublicListListComponent />
      <ContentPublicListList>
        <HeaderPublicListListComponent
          selectFilter={selectFilter}
          setSelectFilter={setSelectFilter}
        />
        <SearchPublicListListComponent
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <ContainerTablePublicListList>
          <CustomTable
            columns={columns}
            dataProvider={currentList[currentPage - 1]}
            size="large"
            disabledOnClick
          />
        </ContainerTablePublicListList>
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
