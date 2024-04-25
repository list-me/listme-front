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
    },
  ];

  const [templates, setTemplates] = useState([]);
  function splitIntoSublists<T>(list: T[], sublistSize: number): T[][] {
    const sublists: T[][] = [];
    for (let i = 0; i < list.length; i += sublistSize) {
      const sublist = list.slice(i, i + sublistSize);
      sublists.push(sublist);
    }
    return sublists;
  }
  const currentList = templates?.length ? splitIntoSublists(templates, 7) : [];

  const [currentPage, setCurrentPage] = useState(1);

  const handleGetTemplates = ({
    page,
    limit,
    is_public,
  }: IPaginationTemplate): void => {
    templateRequests
      .list({ limit, page, is_public })
      .then((response) => {
        setTemplates(response);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetTemplates({ page: 0, limit: 1000, is_public: true });
  }, []);

  return (
    <ContainerPublicListList>
      <SidebarPublicListListComponent />
      <ContentPublicListList>
        <HeaderPublicListListComponent />
        <SearchPublicListListComponent />
        <ContainerTablePublicListList>
          <CustomTable
            columns={columns}
            dataProvider={currentList[currentPage - 1]}
            size="large"
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
