import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LinkIcon } from "../../../../../../../assets/linkPublicList.svg";
import formatDate from "../../../../../utils/formatDate";
import { ContainerTablePublicListList } from "./styles";
import CustomTable from "../../../../../../Table";
import { ROUTES } from "../../../../../../../constants/routes";
import { useFromToContext } from "../../../../../../../context/FromToContext";

function TablePublicListList({
  currentList,
}: {
  currentList: never[];
}): JSX.Element {
  const navigate = useNavigate();
  const { setFromToIsOpened } = useFromToContext();
  const columns = [
    {
      title: "Nome",
      key: "name",
      dataIndex: "name",
      render: (_: any, record: any) => {
        return <span className="defaultText">{record.name}</span>;
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
      render: (_: any, record: any) => {
        return (
          <div className="containerLinkIcon">
            <button
              type="button"
              className="boxLinkIcon"
              onClick={() => {
                setFromToIsOpened(false);
                navigate(`${ROUTES.PRODUCTSPUBLIC}/${record.id}`);
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
      />
    </ContainerTablePublicListList>
  );
}

export default TablePublicListList;
