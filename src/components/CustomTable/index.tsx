/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import ReactDOM from "react-dom/client";
import { renderToString } from "react-dom/server";

import { unmountComponentAtNode } from "react-dom";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { registerAllEditors, registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";
import { toast } from "react-toastify";

import "handsontable/dist/handsontable.full.min.css";

import { CustomTableProps, ICol } from "./CustomTable.d";
import { useProductContext } from "../../context/products";
import { Cell } from "../Cell/index";
import { NewColumn } from "./components/HeaderDropDown/components/NewColumn";
import { Confirmation } from "../Confirmation";

import { Content } from "../../pages/products/styles";
import { productRequests } from "../../services/apis/requests/product";
import { Container } from "./styles";
import { LoadingFetch } from "./LoadingFetch";
import HeaderFilters from "./components/HeaderFilters";
import DefaultTable from "./components/DefaultTable";
import {
  IHeader,
  IProductToTable,
} from "../../context/products/product.context";
import Filter from "../Filter";
import { useFilterContext } from "../../context/FilterContext";
import NotFound from "./components/NotFound";
import HeaderGroups from "../HeaderGroups";

registerAllModules();
registerAllEditors();

const CustomTable: React.FC<CustomTableProps> = ({
  isPublic,
  allRowsSelected,
  setAllRowsSelected,
  rowsSelected,
  setRowsSelected,
}) => {
  const hotRef = useRef<HotTable>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const {
    handleSave,
    handleDelete,
    template,
    COMPONENT_CELL_PER_TYPE,
    headerTable,
    setHeaderTable,
    hidden,
    handleResize,
    handleHidden,
    handleNewColumn,
    handleMove,
    handleRemoveColumn,
    products,
    setProducts,
    colHeaders,
    setColHeaders,
    total,
    setTotal,
    uploadImages,
    handleFreeze,
    conditionsFilter,
    customFields,
  } = useProductContext();
  const [editModeGroup, setEditModeGroup] = useState<"group" | "ungroup" | "">(
    "",
  );
  const [groupReferenceEditMode, setGroupReferenceEditMode] = useState("");
  const [idsColumnsSelecteds, setIdsColumnsSelecteds] = useState<string[]>([]);

  const [cols, setCols] = useState<ICol[]>([]);

  const [page, setPage] = useState<number>(1);
  const [selectedGroup, setSelectedGroup] = useState("");
  const headerTableToView = headerTable.filter((item) => {
    if (selectedGroup.length) {
      if (selectedGroup !== "others") {
        return item.group === selectedGroup;
      }
      return !item.group;
    }
    return item;
  });

  const colHeadersParams = headerTableToView.map((item) => {
    return item.title;
  });

  const colHeadersToView = colHeaders.filter((item) => {
    return colHeadersParams.includes(item) || item === " ";
  });

  const colsToView = useMemo(() => {
    return cols.filter((item) => colHeadersParams.includes(item.title));
  }, [cols, colHeadersParams]);

  const [currentCell, setCurrentCell] = useState<any>({});

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleAddProductClick(): void {
    const { hotInstance } = hotRef.current!;
    if (hotInstance) {
      setProducts((prev) => [{} as IProductToTable, ...prev]);
    }
  }

  const handleMountColumns = useCallback(() => {
    const columnsCustom = headerTable.map((column) => {
      if (
        Object.keys(COMPONENT_CELL_PER_TYPE).includes(
          column.type?.toString()?.toUpperCase(),
        )
      ) {
        return {
          ...column,
          isCustom: true,
        };
      }
      if (column.type === "numeric" || column.type === "decimal") {
        return {
          ...column,
          width: column?.order == undefined ? "193" : column.width,
          isCustom: false,
        };
      }
      return {
        ...column,
        width: column?.order == undefined ? "193" : column.width,
        isCustom: false,
        type: "text",
      };
    });

    setCols(columnsCustom);
  }, [COMPONENT_CELL_PER_TYPE, headerTable]);

  useEffect(() => {
    handleMountColumns();
  }, [handleMountColumns]);

  const handleDeleteColumn = (columnIndex: number): void => {
    setIsOpen(!isOpen);
    try {
      const fields = template.fields.fields?.filter((item: any) => {
        if (item?.id != currentCell?.id) {
          return item;
        }
      });
      const newColumns = [...headerTable];
      newColumns.splice(currentCell.order, 1);
      handleRemoveColumn(
        Number(currentCell?.order),
        fields,
        newColumns,
        currentCell?.id,
      );
      toast.success("Coluna deletada com sucesso");
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao excluir a coluna, porfavor tente novamente",
      );
    }
  };

  const [currentKeyword, setCurrentKeyword] = useState("");
  const handleGetProductFiltered = (keyword: string): void => {
    loadingRef.current!.style.display = "block";
    setCurrentKeyword(() => keyword);
    productRequests
      .list(
        { keyword, limit: 100 },
        window.location.pathname.substring(isPublic ? 17 : 10),
      )
      .then((response) => {
        const productFields: any[] = [];

        const { data } = response;
        if (data) {
          data.products?.forEach((item: any) => {
            const object: any = {};
            item?.fields?.forEach((field: any) => {
              const currentField = headerTable.find(
                (e: any) => e.data == field.id,
              );

              if (currentField && field.value) {
                const test = !COMPONENT_CELL_PER_TYPE[
                  // @ts-ignore
                  currentField?.type?.toUpperCase()
                ]
                  ? field?.value[0]
                  : field?.value;

                object[field?.id] = test;
              }
            });
            productFields.push({
              ...object,
              id: item.id,
              created_at: item.created_at,
            });
          });

          if (!productFields.length && template) {
            productFields.push({ [template[0]]: "" });
          }

          setProducts(productFields);
          loadingRef.current!.style.display = "none";

          const hotInstance = hotRef.current!?.hotInstance;
          if (hotInstance) {
            hotInstance.loadData(productFields);
            const plugin = hotInstance?.getPlugin("search");
            plugin.query(keyword);
            hotInstance.render();
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
        loadingRef.current!.style.display = "none";

        const hotInstance = hotRef.current!?.hotInstance;
        if (hotInstance) {
          hotInstance.render();
        }
        toast.error(err?.response?.data?.message);
      });
  };

  const [parentId, setParentId] = useState<string | null>(null);
  const [subItensMode, setSubItemsMode] = useState<"add" | "remove">("add");

  const checkToHeaderTable = {
    title: "Check",
    data: "000000",
    className: "htLeft htMiddle",
    type: isPublic ? "checkPublic" : "checkSubItem",
    required: false,
    options: [""],
    order: "-1",
    hidden: false,
    width: "300px",
    frozen: false,
  };

  const checkToColHeaders = isPublic ? "checkPublic" : "checkSubItem";

  const checkToCols = {
    title: "Check",
    data: "000000",
    className: "htLeft htMiddle",
    type: isPublic ? "checkPublic" : "checkSubItem",
    required: false,
    options: [""],
    order: "-1",
    hidden: false,
    width: "300px",
    frozen: false,
    isCustom: false,
    bucket: "",
  };
  return (
    <>
      <Confirmation
        description="Ao excluir este produto, você perderá todas as informações, inclusive no catálogo em que está cadastrado."
        action="DELETE"
        title="Excluir Produto"
        pass="excluir"
        handleChangeVisible={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        handleConfirmation={() => {
          handleDeleteColumn(Number(currentCell.order));
        }}
      />
      <Filter />
      <>
        <Content>
          <HeaderFilters
            isPublic={isPublic}
            template={template}
            total={total}
            // @ts-ignore
            headerTable={headerTable}
            handleGetProductFiltered={handleGetProductFiltered}
            handleAddProductClick={() => handleAddProductClick()}
          />
          <HeaderGroups
            editModeGroup={editModeGroup}
            setEditModeGroup={setEditModeGroup}
            fields={template?.fields?.fields}
            groups={template?.fields?.groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            setGroupReferenceEditMode={setGroupReferenceEditMode}
            setIdsColumnsSelecteds={setIdsColumnsSelecteds}
          />
        </Content>
        <Container>
          <DefaultTable
            cols={
              parentId || isPublic
                ? [checkToCols, ...colsToView]
                : (colsToView as any)
            }
            colHeaders={
              parentId || isPublic
                ? [checkToColHeaders, ...colHeadersToView]
                : colHeadersToView
            }
            headerTable={
              parentId || isPublic
                ? [checkToHeaderTable, ...headerTableToView]
                : headerTableToView
            }
            parentId={parentId}
            setParentId={setParentId}
            key={colHeaders.join()}
            hotRef={hotRef}
            setColHeaders={setColHeaders}
            products={products}
            setProducts={setProducts}
            handleDelete={handleDelete}
            handleSave={handleSave}
            loadingRef={loadingRef}
            componentCellPerType={COMPONENT_CELL_PER_TYPE}
            total={total}
            setTotal={setTotal}
            template={template}
            hidden={hidden}
            handleResize={handleResize}
            columns={headerTable}
            setColumns={setHeaderTable}
            handleMove={handleMove}
            uploadImages={uploadImages}
            page={page}
            setPage={setPage}
            currentKeyword={currentKeyword}
            handleNewColumn={handleNewColumn}
            handleHidden={handleHidden}
            setCurrentCell={setCurrentCell}
            setIsOpen={setIsOpen}
            handleFreeze={handleFreeze}
            isPublic={isPublic}
            allRowsSelected={allRowsSelected}
            setAllRowsSelected={setAllRowsSelected}
            rowsSelected={rowsSelected}
            setRowsSelected={setRowsSelected}
            subItensMode={subItensMode}
            setSubItemsMode={setSubItemsMode}
            editModeGroup={editModeGroup}
            setEditModeGroup={setEditModeGroup}
            groupReferenceEditMode={groupReferenceEditMode}
            setGroupReferenceEditMode={setGroupReferenceEditMode}
            idsColumnsSelecteds={idsColumnsSelecteds}
            setIdsColumnsSelecteds={setIdsColumnsSelecteds}
            setSelectedGroup={setSelectedGroup}
          />
          {!!conditionsFilter.length && products.length < 1 && <NotFound />}
        </Container>
        <div ref={loadingRef} style={{ display: "none" }}>
          <LoadingFetch />
        </div>
      </>
    </>
  );
};

export default CustomTable;
