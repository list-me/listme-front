import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as RefreshIcon } from "../../../../../../../assets/refresh.svg";
import { ReactComponent as EllipsisIcon } from "../../../../../../../assets/verticalEllipsis.svg";
import formatDate from "../../../../../utils/formatDate";
import {
  ContainerActionsButtons,
  ContainerTableLinkedListSelector,
} from "./styles";
import CustomTable from "../../../../../../Table";
import { useFromToContext } from "../../../../../../../context/FromToContext";

function TableLinkedListSelector({
  currentList,
}: {
  currentList: never[];
}): JSX.Element {
  const { setCurrentStep } = useFromToContext();

  const columns = [
    {
      title: "Nome",
      key: "name",
      dataIndex: "name",
      render: (_: any, record: any) => {
        return (
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            style={{ border: "none", background: "none" }}
          >
            <span className="defaultText">{record.name}</span>
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
        return <span className="blueText">{total}</span>;
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
      title: "Ação",
      key: "action",
      dataIndex: "action",
      render: (_: any, record: any) => {
        return (
          <ContainerActionsButtons>
            <button type="button">
              <RefreshIcon />
            </button>
            <button type="button">
              <EllipsisIcon />
            </button>
          </ContainerActionsButtons>
        );
      },
    },
  ];

  return (
    <ContainerTableLinkedListSelector>
      <CustomTable
        columns={columns}
        dataProvider={currentList}
        size=""
        disabledOnClick
        isPublic
      />
    </ContainerTableLinkedListSelector>
  );
}

export default TableLinkedListSelector;
