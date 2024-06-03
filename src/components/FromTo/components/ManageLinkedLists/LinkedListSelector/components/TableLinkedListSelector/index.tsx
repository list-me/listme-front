import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as RefreshIcon } from "../../../../../../../assets/refresh.svg";
import { ReactComponent as EllipsisIcon } from "../../../../../../../assets/verticalEllipsis.svg";
import { ReactComponent as TrashIcon } from "../../../../../../../assets/trash-red.svg";
import formatDate from "../../../../../utils/formatDate";
import {
  ContainerActionsButtons,
  ContainerTableLinkedListSelector,
  DeleteDropDown,
} from "./styles";
import CustomTable from "../../../../../../Table";
import { useFromToContext } from "../../../../../../../context/FromToContext";

function TableLinkedListSelector({
  currentList,
  setTemplateSelected,
  setTemplatesSyncIds,
  setUpdateModalOpened,
  setDeleteAll,
}: {
  currentList: never[];
  setTemplateSelected: React.Dispatch<React.SetStateAction<any>>;
  setTemplatesSyncIds: React.Dispatch<React.SetStateAction<string[]>>;
  setUpdateModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteAll: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { setCurrentStep } = useFromToContext();
  const [openedDropDown, setOpenedDropDown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState({ top: 0, left: 0 });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleDropDownOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: any,
  ) => {
    const buttonCoordinates = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setDropDownPosition({
      top: mouseY - buttonCoordinates.height,
      left: mouseX - buttonCoordinates.width / 2,
    });
    setOpenedDropDown(true);
    setTemplateSelected(item);
    setDeleteAll(true);
  };

  const columns = [
    {
      title: "Nome",
      key: "name",
      dataIndex: "name",
      render: (_: any, record: any) => {
        return (
          <button
            type="button"
            onClick={() => {
              setTemplateSelected(record);
              setCurrentStep(1);
            }}
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
          record.product_amount >= 1000
            ? Number(record.product_amount / 1000).toFixed(3)
            : record.product_amount;

        const totalNewProducts = record?.new_products_amount;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#3818D9" }}> {total} </span>
            {totalNewProducts > 0 ? (
              <button
                type="button"
                style={{
                  background: "#F15757",
                  color: "#fff",
                  fontSize: "12px",
                  height: "17px",
                  padding: "0 4px",
                  borderRadius: "99px",
                  border: "none",
                  flexShrink: 0,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                +{totalNewProducts} Novos
              </button>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },

    {
      title: "Última edição",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (_: any, record: any) => {
        return (
          <span className="grayText">{formatDate(record.created_at)}</span>
        );
      },
    },
    {
      title: "Ação",
      key: "action",
      dataIndex: "action",
      render: (_: any, record: any) => {
        const totalNewProducts = record?.new_products_amount;

        return (
          <div>
            <ContainerActionsButtons>
              {totalNewProducts > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const { id } = record;
                    setTemplatesSyncIds([id]);
                    setUpdateModalOpened(true);
                  }}
                >
                  <RefreshIcon />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => handleDropDownOpen(e, record)}
              >
                <EllipsisIcon />
              </button>
            </ContainerActionsButtons>
          </div>
        );
      },
    },
  ];

  const dropDownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpenedDropDown(false);
      }
    };

    if (openedDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openedDropDown]);
  return (
    <>
      <ContainerTableLinkedListSelector>
        <CustomTable
          columns={columns}
          dataProvider={currentList}
          size=""
          disabledOnClick
          isPublic
        />
        {openedDropDown && (
          <DeleteDropDown
            ref={dropDownRef}
            style={{
              top: dropDownPosition.top + 45,
              left: dropDownPosition.left - 120,
            }}
            onClick={() => setCurrentStep(2)}
          >
            <TrashIcon />
            <p>Excluir vínculo</p>
          </DeleteDropDown>
        )}
      </ContainerTableLinkedListSelector>
    </>
  );
}

export default TableLinkedListSelector;
