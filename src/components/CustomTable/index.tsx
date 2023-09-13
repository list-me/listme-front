/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import ReactDOM from "react-dom/client";
import { unmountComponentAtNode } from "react-dom";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { registerAllEditors, registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";
import { toast } from "react-toastify";

import "handsontable/dist/handsontable.full.min.css";

import { CustomTableProps } from "./CustomTable.d";
import { useProductContext } from "../../context/products";
import { Cell } from "../Cell/index";
import { NewColumn } from "../NewColumn";
import { Confirmation } from "../Confirmation";

import { Content } from "../../pages/products/styles";
import { productRequests } from "../../services/apis/requests/product";
import { Container } from "./styles";
import { LoadingFetch } from "./LoadingFetch";
import HeaderFilters from "./components/HeaderFilters";
import DefaultTable from "./components/DefaultTable";

registerAllModules();
registerAllEditors();

const CustomTable: React.FC<CustomTableProps> = () => {
  const hotRef = useRef<HotTable>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const {
    handleSave,
    handleDelete,
    template,
    COMPONENT_CELL_PER_TYPE,
    headerTable,
    hidden,
    handleResize,
    handleHidden,
    handleNewColumn,
    handleMove,
    handleRemoveColumn,
    products,
    colHeaders,
    total,
    uploadImages,
    handleGetProductsFiltered,
  } = useProductContext();

  const [cols, setCols] = useState<any[]>([]);
  console.log("🚀 ~ file: index.tsx:57 ~ cols:", cols);

  const [currentCell, setCurrentCell] = useState<any>({});

  const [columns, setColumns] = useState<any[]>(headerTable);
  const [headers, setHeaders] = useState<string[]>(colHeaders);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [dataProvider, setDataProvider] = useState<any[]>(products ?? []);

  function handleAddProductClick(): void {
    const { hotInstance } = hotRef.current!;
    if (hotInstance) {
      setDataProvider((prev) => [{}, ...prev]);
    }
  }

  const handleMountColumns = useCallback(() => {
    const columnsCustom = headerTable.sort().map((column) => {
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
      return {
        ...column,
        width: column?.order == undefined ? "193" : column.width,
        isCustom: false,
        type: "text",
      };
    });

    setCols(columnsCustom);
  }, [COMPONENT_CELL_PER_TYPE, headerTable]);

  const handleDeleteColumn = (column: number): void => {
    setIsOpen(!isOpen);
    try {
      const fields = template.fields.fields?.filter((item: any) => {
        if (item?.id != currentCell?.id) {
          return item;
        }
      });

      const newColumns = [...columns];
      newColumns.splice(currentCell.order, 1);

      const newCols = [...cols];
      newCols.splice(Number(column), 1);
      setCols(newCols);

      const contentHeaders = newColumns
        .filter((element) => {
          const ids = fields.map((item: any) => item?.id) as any[];
          if (ids.includes(element?.data)) {
            return element;
          }
        })
        .map((item) => item.title);

      contentHeaders.push(" ");
      setHeaders(contentHeaders);

      handleRemoveColumn(
        Number(currentCell?.order),
        fields,
        newColumns,
        currentCell?.id,
      );
      window.location.reload();
      toast.success("Coluna deletada com sucesso");
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao excluir a coluna, porfavor tente novamente",
      );
    }
  };

  const renderHeaderComponent = useCallback(
    (column: number, TH: HTMLTableHeaderCellElement) => {
      if (TH.querySelector(".customHeader") && column === -1) {
        TH.replaceChildren("");
        return;
      }

      const existent = TH.querySelector(".customHeader");
      if (existent) {
        unmountComponentAtNode(existent);
        const myComponent = document.createElement("div");
        myComponent.className = "customHeader";

        const col = template?.fields?.fields.find((item: any) => {
          if (item.id === columns[column]?.data) {
            return item;
          }
        });

        if (headers[column] === " ") {
          ReactDOM.createRoot(myComponent).render(
            <NewColumn
              template={template}
              newColumn={template}
              setNewColumn={(newColumn: any, templateUpdated: any) => {
                newColumn = {
                  ...newColumn,
                  className: "htLeft htMiddle",
                  frozen: false,
                  hidden: false,
                  order: String(columns.length + 1),
                  width: "300",
                };

                const newPosition = [...columns, newColumn];
                newPosition.splice(newPosition.length - 2, 1);
                newPosition.push({});
                setColumns(newPosition);

                const contentHeaders = columns.map((item) => item?.title);
                contentHeaders.splice(columns.length - 1, 1);
                contentHeaders.push(newColumn?.title);
                contentHeaders.push(" ");
                setHeaders(contentHeaders);
                handleNewColumn(newColumn, templateUpdated);
              }}
            />,
          );
        } else {
          ReactDOM.createRoot(myComponent).render(
            <Cell
              label={headers[column]}
              column={col}
              template={template}
              handleHidden={() => {
                return handleHidden(column, template, true);
              }}
              handleFrozen={() => {
                const freezePlugins =
                  hotRef.current!.hotInstance?.getPlugin("manualColumnFreeze");

                if (freezePlugins) {
                  freezePlugins?.freezeColumn(1);
                  hotRef.current!.hotInstance?.render();
                }
                return true;
              }}
              freeze={!!headerTable[column]?.frozen}
              handleSort={() => {}}
              handleDeleteColumn={() => {
                col.order = column.toString();
                setCurrentCell(col);
                setIsOpen(!isOpen);
              }}
            />,
          );
        }

        TH.replaceChildren(myComponent);
        return;
      }

      const myComponent = document.createElement("div");
      myComponent.className = "customHeader";

      TH.replaceChildren(myComponent);
    },
    [
      columns,
      handleHidden,
      handleNewColumn,
      headerTable,
      headers,
      isOpen,
      template,
    ],
  );

  const [currentKeyword, setCurrentKeyword] = useState("");
  const handleGetProductFiltered = (keyword: string): void => {
    loadingRef.current!.style.display = "block";
    setCurrentKeyword(() => keyword);
    productRequests
      .list({ keyword, limit: 100 }, window.location.pathname.substring(10))
      .then((response) => {
        const productFields: any[] = [];

        const { data } = response;
        if (data) {
          data.products?.forEach((item: any) => {
            const object: any = {};
            item.fields.forEach((field: any) => {
              const currentField = headerTable.find(
                (e: any) => e.data == field.id,
              );

              if (currentField && field.value) {
                const test = !COMPONENT_CELL_PER_TYPE[
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

          setDataProvider(productFields);
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
      .catch((errr: any) => {
        console.log(errr);
        loadingRef.current!.style.display = "none";

        const hotInstance = hotRef.current!?.hotInstance;
        if (hotInstance) {
          hotInstance.render();
        }
        toast.error(errr.response.data.message);
      });
  };

  useEffect(() => {
    handleMountColumns();
  }, [handleMountColumns]);

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
      <>
        <Content>
          <HeaderFilters
            template={template}
            headerTable={headerTable}
            handleGetProductFiltered={handleGetProductFiltered}
            handleAddProductClick={() => handleAddProductClick()}
          />
        </Content>
        <Container>
          <DefaultTable
            hotRef={hotRef}
            headers={headers}
            setHeaders={setHeaders}
            cols={cols}
            dataProvider={dataProvider}
            setDataProvider={setDataProvider}
            handleDelete={handleDelete}
            handleSave={handleSave}
            loadingRef={loadingRef}
            componentCellPerType={COMPONENT_CELL_PER_TYPE}
            total={total}
            handleGetProductsFiltered={handleGetProductsFiltered}
            currentKeyword={currentKeyword}
            template={template}
            renderHeaderComponent={renderHeaderComponent}
            hidden={hidden}
            handleResize={handleResize}
            columns={columns}
            handleMove={handleMove}
            uploadImages={uploadImages}
          />
        </Container>
        <div ref={loadingRef} style={{ display: "none" }}>
          <LoadingFetch />
        </div>
      </>
    </>
  );
};

export default CustomTable;
