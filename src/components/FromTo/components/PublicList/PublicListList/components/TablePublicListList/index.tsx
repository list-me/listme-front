import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as LinkIcon } from "../../../../../../../assets/linkPublicList.svg";
import formatDate from "../../../../../utils/formatDate";
import { ContainerTablePublicListList } from "./styles";
import CustomTable from "../../../../../../Table";
import { ROUTES } from "../../../../../../../constants/routes";
import { useFromToContext } from "../../../../../../../context/FromToContext";
import { useProductContext } from "../../../../../../../context/products";

function TablePublicListList({
  currentList,
}: {
  currentList: never[];
}): JSX.Element {
  const location = useLocation();
  const isTemplatesPage = location.pathname.includes("templates");

  const navigate = useNavigate();
  const { setFromToIsOpened } = useFromToContext();
  const {
    template,
    setTargetTemplatePublic,
    colHeaders,
    setTargetColHeaders,
    headerTable,
    setTargetHeaderTable,
  } = useProductContext();

  const columns = [
    {
      title: "Nome",
      key: "name",
      dataIndex: "name",
      render: (_: any, record: any) => {
        return (
          <button
            type="button"
            style={{ border: "none", background: "none" }}
            onClick={() => {
              setFromToIsOpened(false);
              navigate(`/products/${record.id}`);
            }}
            className="defaultText"
          >
            {record.name}
          </button>
        );
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
        return (
          <button
            type="button"
            style={{ border: "none", background: "none" }}
            onClick={() => {
              setFromToIsOpened(false);
              navigate(`/products/${record.id}`);
            }}
            className="blueText"
          >
            {total}
          </button>
        );
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
      render: (_: any, record: any) => {
        return (
          <div className="containerLinkIcon">
            <button
              type="button"
              className="boxLinkIcon"
              onClick={() => {
                setFromToIsOpened(false);
                setTargetTemplatePublic(template);
                setTargetColHeaders(colHeaders);
                setTargetHeaderTable(headerTable);
                navigate(
                  `${
                    isTemplatesPage
                      ? ROUTES.PRODUCTSPUBLICOUTSIDE
                      : ROUTES.PRODUCTSPUBLIC
                  }/${record.id}`,
                );
              }}
            >
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
        dataProvider={currentList}
        size="large"
        disabledOnClick
        isPublic
      />
    </ContainerTablePublicListList>
  );
}

export default TablePublicListList;
