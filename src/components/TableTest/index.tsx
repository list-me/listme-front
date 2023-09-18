import { HotColumn, HotTable } from "@handsontable/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Handsontable from "handsontable";
import { CellValue, RangeType } from "handsontable/common";
import { unmountComponentAtNode } from "react-dom";
import ReactDOM from "react-dom/client";
import { toast } from "react-toastify";
import { IField, IHeader } from "../../context/Teste/test.context";
import { IColumnsCustom } from "./TableTest";
import RelationEditor from "../CustomTable/Editors/Relation";
import handleCellChange from "../CustomTable/components/DefaultTable/utils/handleCellChange";
import handleBeforeCopy from "../CustomTable/components/DefaultTable/utils/handleBeforeCopy";
import handleAfterPaste from "../CustomTable/components/DefaultTable/utils/handleAfterPaste";
import { LoadingFetch } from "../CustomTable/LoadingFetch";
import { NewColumn } from "../NewColumn";
import { Cell } from "../Cell";
import handleAfterColumnMove from "../CustomTable/components/DefaultTable/utils/handleAfterColumnMove";
import handleAfterScrollVertically from "../CustomTable/components/DefaultTable/utils/handleAfterScrollVertically";
import hasAtLeastOneProduct from "../CustomTable/components/DefaultTable/utils/hasAtLeastOneProduct";
import handleRemoveRow from "../CustomTable/components/DefaultTable/utils/handleRemoveRow";
import { useTesteContext } from "../../context/Teste";

function TableTest(): JSX.Element | null {
  const {
    products,
    colHeaders,
    setColHeaders,
    headerTable,
    COMPONENT_CELL_PER_TYPE,
    hidden,
    handleSave,
    handleResize,
    template,
    handleNewColumn,
    handleHidden,
    handleMove,
    total,
    setTotal,
    handleDelete,
  } = useTesteContext();

  const hotRef = useRef<HotTable>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const [dataProvider, setDataProvider] = useState<Object[]>(products ?? []);
  const [isTableLocked, setIsTableLocked] = useState(false);
  const [cols, setCols] = useState<IColumnsCustom>();
  const [columns, setColumns] = useState<IHeader[]>(headerTable);
  const [currentCell, setCurrentCell] = useState<IField | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [currentKeyword, setCurrentKeyword] = useState<string>("");

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
        width: column?.order === undefined ? "193" : column.width,
        isCustom: false,
        type: "text",
      };
    });

    setCols(columnsCustom);
  }, [COMPONENT_CELL_PER_TYPE, headerTable]);

  useEffect(() => {
    handleMountColumns();
  }, [handleMountColumns]);

  const customRendererRelation = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      _col: number,
      _prop: string | number,
      value: any,
    ): void => {
      let newValue = value;
      if (typeof value === "string" && value.length) {
        newValue = JSON.parse(value);
      }
      const totalItems = newValue ? newValue.length : 0;
      // eslint-disable-next-line no-param-reassign
      td.innerHTML = `<div class="tag-content">${totalItems} Items relacionados</div>`;
    },
    [],
  );

  const afterChangeCallback = async (
    changes: Handsontable.CellChange[] | null,
    source: string,
  ): Promise<null | undefined> => {
    if (source === "CopyPaste.paste") return null;
    if (hotRef.current) {
      const { hotInstance } = hotRef.current;
      await handleCellChange(
        changes,
        hotInstance,
        isTableLocked,
        setIsTableLocked,
        handleSave,
        dataProvider,
        setDataProvider,
      );
    }
    return null;
  };

  const beforeCopyCallback = (
    data: CellValue[][],
    coords: RangeType[],
  ): void => {
    handleBeforeCopy(data, coords, hotRef, cols);
  };

  const afterPasteCallback = async (
    data: CellValue[][],
    coords: RangeType[],
  ): Promise<void> => {
    await handleAfterPaste(
      data,
      coords,
      hotRef,
      isTableLocked,
      loadingRef,
      cols,
      dataProvider,
      COMPONENT_CELL_PER_TYPE,
      handleSave,
    );
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

        const col = template?.fields?.fields.find((item) => {
          if (item.id === columns[column]?.data) {
            return item;
          }
        });

        if (colHeaders[column] === " ") {
          ReactDOM.createRoot(myComponent).render(
            <NewColumn
              template={template}
              newColumn={template}
              setNewColumn={(newColumn: any, templateUpdated: any) => {
                // eslint-disable-next-line no-param-reassign
                newColumn = {
                  ...newColumn,
                  className: "htLeft htMiddle",
                  frozen: false,
                  hidden: false,
                  order: String(columns.length + 1),
                  width: "300",
                } as any;

                const newPosition = [...columns, newColumn];
                newPosition.splice(newPosition.length - 2, 1);
                newPosition.push({});
                setColumns(newPosition);

                const contentHeaders = columns.map((item) => item?.title);
                contentHeaders.splice(columns.length - 1, 1);
                contentHeaders.push(newColumn?.title);
                contentHeaders.push(" ");
                setColHeaders(contentHeaders);
                handleNewColumn(newColumn, templateUpdated);
              }}
            />,
          );
        } else {
          ReactDOM.createRoot(myComponent).render(
            <Cell
              label={colHeaders[column]}
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
                col!.order = column.toString();
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
      colHeaders,
      columns,
      handleHidden,
      handleNewColumn,
      headerTable,
      isOpen,
      setColHeaders,
      template,
    ],
  );

  const afterColumnMoveCallback = (
    movedColumns: number[],
    finalIndex: number,
    dropIndex: number | undefined,
    movePossible: boolean,
    orderChanged: boolean,
  ): void => {
    handleAfterColumnMove(
      movedColumns,
      finalIndex,
      dropIndex,
      movePossible,
      orderChanged,
      columns,
      setColHeaders,
      handleMove,
    );
  };

  const afterScrollVerticallyCallback = (): void => {
    handleAfterScrollVertically(
      hotRef,
      total,
      setTotal,
      dataProvider,
      setDataProvider,
      loadingRef,
      setIsTableLocked,
      template,
      page,
      setPage,
      headerTable,
      COMPONENT_CELL_PER_TYPE,
      currentKeyword,
    );
  };

  if (cols && dataProvider)
    return (
      <>
        <div style={{ width: "100%", height: "100vh" }}>
          <HotTable
            ref={hotRef}
            licenseKey="non-commercial-and-evaluation"
            data={dataProvider}
            height="100%"
            width="100%"
            colHeaders={colHeaders}
            readOnly={isTableLocked}
            columns={cols}
            manualColumnResize
            filters
            autoRowSize={false}
            autoColumnSize={false}
            manualColumnMove
            search
            renderAllRows={false}
            viewportRowRenderingOffset={100}
            viewportColumnRenderingOffset={cols.length}
            rowHeaders
            columnSorting={{ sortEmptyCells: false, headerAction: false }}
            rowHeights="52px"
            fixedColumnsStart={1}
            hiddenColumns={{ columns: hidden, indicators: true }}
            afterChange={afterChangeCallback}
            afterColumnResize={async (newSize: number, column: number) => {
              handleResize(column, newSize);
            }}
            afterRenderer={(TD, row, col) => {
              if (col + 1 === colHeaders.length) {
                TD.style.display = "none";
              }
            }}
            beforeCopy={beforeCopyCallback}
            afterPaste={afterPasteCallback}
            afterGetColHeader={renderHeaderComponent}
            afterColumnMove={afterColumnMoveCallback}
            afterScrollVertically={afterScrollVerticallyCallback}
            contextMenu={{
              items: {
                remove_row: {
                  name: "Excluir produto",
                  async callback(key: string, selection: any[]) {
                    const { hotInstance } = hotRef.current!;
                    if (hasAtLeastOneProduct(dataProvider)) {
                      if (hotInstance) {
                        handleRemoveRow(
                          hotInstance,
                          selection,
                          handleDelete,
                          dataProvider,
                        );
                      }
                    } else {
                      toast.warn("O catálogo deve conter ao menos um produto");
                    }
                  },
                },
              },
            }}
          >
            {cols.map((col) => {
              if (col.type === "relation") {
                return (
                  <HotColumn
                    _columnIndex={+col.order}
                    data={col.data}
                    width={col.width}
                    key={col.order + col.data}
                    renderer={customRendererRelation}
                  >
                    <RelationEditor
                      hot-editor
                      editorColumnScope={0}
                      templateId=""
                      column={col}
                      dataProvider={dataProvider}
                      field=""
                    />
                  </HotColumn>
                );
              }
              return (
                <HotColumn
                  width={col.width}
                  _columnIndex={+col.order}
                  data={col.data}
                  key={col.order + col.data}
                />
              );
            })}
          </HotTable>
        </div>
        <div ref={loadingRef} style={{ display: "none" }}>
          <LoadingFetch />
        </div>
      </>
    );
  return null;
}

export default TableTest;
