import React from "react";
import { ReactComponent as LinkIcon } from "../../../../../../../assets/linkPublicList.svg";
import formatDate from "../../../../../utils/formatDate";
import { ContainerTablePublicListList } from "./styles";
import CustomTable from "../../../../../../Table";

function TablePublicListList({
  currentList,
  currentPage,
}: {
  currentList: never[][];
  currentPage: number;
}): JSX.Element {
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

  return (
    <ContainerTablePublicListList>
      <CustomTable
        columns={columns}
        dataProvider={currentList[currentPage - 1]}
        size="large"
        disabledOnClick
      />
    </ContainerTablePublicListList>
  );
}

export default TablePublicListList;
