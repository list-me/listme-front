import ReactDOM from "react-dom";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";
import { toast } from "react-toastify";

import { CustomTableProps } from "./CustomTable.d";
import { productContext } from "../../context/products";
import { TableField } from "../TableField";
import { Cell } from "../Cell/index";
import { NewColumn } from "../NewColumn";
import { Confirmation } from "../Confirmation";
import { CellChange, ChangeSource } from "handsontable/common";

registerAllModules();

// const CellMemo = React.memo(Cell);
// const NewColumnMemo = React.memo(NewColumn);
// const TableFieldMemo = React.memo(TableField);

interface Required {
  row: number;
  col: number;
}

const CustomTable: React.FC<CustomTableProps> = ({
  dataProvider,
  colHeaders,
  setEnable = () => {},
}) => {
  const hotRef = useRef<HotTable>(null);
  const {
    handleSave,
    handleDelete,
    handleAdd,
    template,
    COMPONENT_CELL_PER_TYPE,
    headerTable,
    hidden,
    handleResize,
    handleHidden,
    handleFreeze,
    handleNewColumn,
    handleMove,
    filter,
    handleRemoveColumn,
  } = useContext(productContext);
  console.log("Renderizado");

  const [cols, setCols] = useState<any[]>([]);
  const [currentCell, setCurrentCell] = useState<any>({});
  const [columns, setColumns] = useState<any[]>(headerTable);
  const [frozen, setFrozen] = useState<number>(0);
  const [headers, setHeaders] = useState<string[]>(colHeaders ?? [""]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState(false);
  const [iconClicked] = useState<boolean>(true);

  const customRenderer = (
    td: HTMLTableCellElement,
    customComponent: React.ReactElement,
    col: string,
    row: number,
    className: string,
  ): void => {
    if (!td) return;

    const tdNode = ReactDOM.findDOMNode(td);
    td.innerText = "";

    const myComponent = document.createElement("div");
    myComponent.className = "customComponent htMiddle";
    // myComponent.id = `ID${col}${row}`;

    ReactDOM.render(customComponent, myComponent);
    tdNode?.appendChild(myComponent);
  };

  const handleMountColumns = () => {
    const columnsCustom: any[] = [];
    columns.sort().forEach((column) => {
      if (
        Object.keys(COMPONENT_CELL_PER_TYPE).includes(
          column.type?.toString().toUpperCase(),
        )
      ) {
        columnsCustom.push({
          data: column.data,
          className: column.className,
          order: column.order,
          width: column.width,
          frozen: column.frozen,
          hidden: column.hidden,
          readOnly: true,
          renderer: (
            instance: Handsontable,
            td: HTMLTableCellElement,
            row: number,
            col: number,
          ): void => {
            if (dataProvider?.length) {
              let initialValue = dataProvider[row]?.[column.data];
              if (!initialValue) {
                initialValue = [""];
              }

              const test = instance
                .getCellMetaAtRow(row)
                .find((e) => e.className == "invalid-cell");
              let className = "";

              if (test && column.required) {
                className = "invalid-cell";
              }

              customRenderer(
                td,
                <TableField
                  value={initialValue}
                  type={column.type}
                  options={column.options}
                  handleSetNewValue={(e: string | number) => {
                    const value = typeof e === "object" ? e : [e];
                    instance.setDataAtCell(row, col, value);
                    return false;
                  }}
                  col={col}
                  instance={hotRef.current!.hotInstance}
                  row={row}
                  prop={column.data}
                  td={td}
                  column={column}
                  currentItem={dataProvider[row]}
                  className={className}
                />,
                column.data,
                row,
                className,
              );
            }
          },
        });

        return;
      }

      columnsCustom.push({
        data: column.data,
        className: column.className,
        width: column?.order == undefined ? "193" : column.width,
        frozen: column.frozen,
        order: column.order,
        hidden: column.hidden,
      });
    });

    setCols(columnsCustom);
  };

  const handleDeleteColumn = (): void => {
    setIsOpen(!isOpen);
    try {
      const fields = template.fields.fields?.filter((item: any) => {
        if (item?.id != currentCell?.id) {
          return item;
        }
      });

      const newColumns = [...columns];
      newColumns.splice(Number(currentCell?.order), 1);
      setColumns(newColumns);

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
      setPosition(!position);
      toast.success("Coluna deletada com sucesso");
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao excluir a coluna, porfavor tente novamente",
      );
    }
  };

  const beforeColumnMove = useCallback(
    (movedColumns: any, finalIndex: any) => {
      return iconClicked;
    },
    [iconClicked],
  );

  const renderHeaderComponent = useCallback(
    (column: number, TH: HTMLTableHeaderCellElement) => {
      if (TH.querySelector(".customHeader") && column === -1) {
        TH.replaceChildren("");
        return;
      }

      const existent = TH.querySelector(".customHeader");
      if (existent) {
        ReactDOM.unmountComponentAtNode(existent);
        const myComponent = document.createElement("div");
        myComponent.className = "customHeader";

        const col = template?.fields?.fields.find((item: any) => {
          if (item.id === columns[column]?.data) {
            return item;
          }
        });

        if (headers[column] === " ") {
          ReactDOM.render(
            <NewColumn
              template={template}
              newColumn={template}
              setNewColumn={(newColumn: any, templateUpdated: any) => {
                // const fields = template;
                // fields.fields.fields = templateUpdated;
                // setCurrentTemplate(fields);
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
            myComponent,
          );
        } else {
          ReactDOM.render(
            <Cell
              label={headers[column]}
              column={col}
              template={template}
              handleHidden={() => {
                return handleHidden(column, template, true);
              }}
              handleFrozen={(e: any, operation: any) => {
                if (operation == "unfreeze") {
                  setFrozen(0);
                  handleFreeze(column, false, "unfreeze");

                  setColumns((prev) => {
                    return prev.map((item) => {
                      return {
                        ...item,
                        frozen: false,
                      };
                    });
                  });

                  return true;
                }
                // if (col?.order == e) {
                const colWidth = headerTable
                  .filter((item) => {
                    if (Number(item?.order) <= Number(col?.order)) return item;
                  })
                  .map((element) => {
                    if (element.width)
                      return Number(element.width.replace("px", ""));
                  });

                // if (colWidth).reduce((before, after) => before + after);

                // const tableWidth = hotRef.current!?.__hotInstance.rootElement.clientWidth
                // if (colWidth && tableWidth && colWidth > tableWidth * 0.65) {
                //     toast.warn("A coluna selecionada excede o limite de visualização da tela")
                //     return false;
                // }

                const test = columns.map((item, index) => {
                  if (index == column) {
                    return {
                      ...item,
                      frozen: true,
                    };
                  }
                  return item;
                });

                col.frozen = true;
                setColumns((prev) => {
                  return prev.map((item, index) => {
                    if (index == column) {
                      return {
                        ...item,
                        frozen: true,
                      };
                    }
                    return item;
                  });
                });

                setFrozen(column + 1);
                handleFreeze(col, true);
                // }
                return true;
              }}
              freeze={!!headerTable[column]?.frozen}
              handleSort={(e: any, operation: any) => {
                //   // setData(data.sort((a, b) => {
                //   //     if (a[col?.data] == b[col?.data]) return 0;
                //   //     if (a[col?.data] < b[col?.data]) return 1
                //   //     return -1;
                //   // }))
              }}
              handleDeleteColumn={() => {
                col.order = column.toString();
                setCurrentCell(col);
                setIsOpen(!isOpen);
              }}
            />,
            myComponent,
          );
        }

        TH.replaceChildren(myComponent);
        return;
      }

      const myComponent = document.createElement("div");
      myComponent.className = "customHeader";

      TH.replaceChildren(myComponent);
    },
    [headers, template, headerTable, columns, hidden],
  );

  useEffect(() => {
    const toFreeze = headerTable.filter((item) => item?.frozen === true);
    if (toFreeze.length > 0) {
      setFrozen(toFreeze.length);
    }

    handleMountColumns();
  }, [headerTable, dataProvider]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        if (hotRef.current) {
          hotRef?.current?.hotInstance?.deselectCell();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Confirmation
        description="Ao excluir este produto, você perderá todas as informações, inclusive no catálogo em que está cadastrado."
        action="DELETE"
        title="Excluir Produto"
        pass="excluir"
        handleChangeVisible={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        handleConfirmation={handleDeleteColumn}
      />
      <HotTable
        ref={hotRef}
        colHeaders={headers}
        columns={cols}
        data={dataProvider}
        // height="100%"
        width="100%"
        stretchH="all"
        manualColumnResize
        // manualRowResize
        // autoRowSize
        beforeColumnMove={beforeColumnMove}
        // manualColumnMove
        viewportRowRenderingOffset={10}
        viewportColumnRenderingOffset={999}
        renderAllRows={false}
        // rerenderOnColumnResize={false}
        rowHeaders
        columnSorting={{ sortEmptyCells: false, headerAction: false }}
        contextMenu={{
          items: {
            remove_row: {
              name: "Excluir produto",
              callback(key: string, selection: any[], clickEvent: MouseEvent) {
                if (dataProvider?.length)
                  handleDelete(dataProvider[selection[0].start.row]);
              },
            },
          },
        }}
        rowHeights="52px"
        licenseKey="non-commercial-and-evaluation"
        // beforeChange={(
        //   changes: Array<CellChange | null>,
        //   source: ChangeSource,
        // ) => {
        //   // const currentCellValue = changes[0][2];
        //   // const newValue = changes[0][3];
        //   // const row = changes[0][0];
        //   // const col = cols.findIndex((col) => col?.data === changes[0][1]);
        //   // const columnType = headerTable[col]?.type;
        //   // if (columnType === "text" && newValue.length > 100) {
        //   //   toast.warn("The text field cannot be longer than 100 characters");
        //   //   return false;
        //   // }
        //   // if (columnType === "paragraph" && newValue.length > 255) {
        //   //   toast.warn("O campo parágrafo deve conter até 200 caractéres");
        //   //   return false;
        //   // }
        //   // return true;
        // }}
        // afterChange={(changes: Handsontable.CellChange[] | null, source) => {
        //   if (changes !== null && changes?.length) {
        //     const customChanges = changes as Handsontable.CellChange[];
        //     const hotInstance = hotRef.current!.hotInstance;
        //     if (customChanges[0][2] !== customChanges[0][3]) {
        //       if (dataProvider?.length && hotInstance) {
        //         const newDataProvider = dataProvider;
        //         newDataProvider[customChanges[0][0]][customChanges[0][1]] =
        //           customChanges[0][3];

        //         const currentFields = Object.keys(
        //           newDataProvider[customChanges[0][0]],
        //         ).filter((key) => newDataProvider[customChanges[0][0]][key]);

        //         const allElementsExist = requiredFields.every((elem: any) =>
        //           currentFields.includes(elem),
        //         );

        //         console.log({ allElementsExist });
        //         if (!allElementsExist) {
        //           const rowMeta = hotInstance.getCellMetaAtRow(
        //             customChanges[0][0],
        //           );
        //           const metaExists = rowMeta.find(
        //             (e) => e.className == "invalid-cell",
        //           );

        //           if (metaExists) return;

        //           requiredFields.forEach((key: any, index: number) => {
        //             const currentClassName = hotInstance.getCellMeta(
        //               customChanges[0][0],
        //               index,
        //             ).className;

        //             if (currentClassName !== "invalid-cell") {
        //               hotInstance.setCellMeta(
        //                 customChanges[0][0],
        //                 index,
        //                 "className",
        //                 "invalid-cell",
        //               );
        //             }
        //           });

        //           return false;
        //         } else {
        //           setTimeout(() => {
        //             requiredFields.forEach((key: any, index: number) => {
        //               const currentClassName = hotInstance.getCellMeta(
        //                 customChanges[0][0],
        //                 index,
        //               ).className;

        //               console.log({ currentClassName });

        //               if (currentClassName !== "") {
        //                 hotInstance.setCellMeta(
        //                   customChanges[0][0],
        //                   index,
        //                   "className",
        //                   "",
        //                 );
        //               }
        //             });

        //             // hotInstance.render();
        //           }, 0);
        //         }

        //         // handleSave(newDataProvider[customChanges[0][0]]);
        //       }
        //     }
        //   }
        // }}
        beforeChange={(changes: (Handsontable.CellChange | null)[], source) => {
          if (changes.length) {
            const customChanges = changes as Handsontable.CellChange[];
            if (customChanges[0][2] != customChanges[0][3] && dataProvider) {
              const hotInstance = hotRef.current!.hotInstance;
              const requiredFields = template.fields.fields
                .filter((field: any) => {
                  return field.required;
                })
                .map((filtered: any) => filtered.id);

              const newDataProvider = dataProvider;
              newDataProvider[customChanges[0][0]][customChanges[0][1]] =
                customChanges[0][3];

              const currentFields = Object.keys(
                newDataProvider[customChanges[0][0]],
              ).filter((key) => newDataProvider[customChanges[0][0]][key]);

              const allElementsExist = requiredFields.every((elem: any) =>
                currentFields.includes(elem),
              );

              if (!allElementsExist && hotInstance) {
                const metaExists = hotInstance
                  .getCellMetaAtRow(customChanges[0][0])
                  .find((e) => e.className == "invalid-cell");

                if (metaExists) return true;

                requiredFields.forEach((key: any, index: number) => {
                  const currentClassName = hotInstance.getCellMeta(
                    customChanges[0][0],
                    index,
                  ).className;

                  if (currentClassName !== "invalid-cell") {
                    hotInstance.setCellMeta(
                      customChanges[0][0],
                      index,
                      "className",
                      "invalid-cell",
                    );
                  }
                });
              } else {
                if (
                  hotInstance &&
                  requiredFields.includes(customChanges[0][1])
                ) {
                  requiredFields.forEach((key: any, index: number) => {
                    const currentClassName = hotInstance.getCellMeta(
                      customChanges[0][0],
                      index,
                    ).className;

                    if (currentClassName == "invalid-cell") {
                      hotInstance.setCellMeta(
                        customChanges[0][0],
                        index,
                        "className",
                        "",
                      );
                    }
                  });
                  setEnable();
                }

                handleSave(newDataProvider[customChanges[0][0]]);
              }

              return true;
            }

            return false;
          }
        }}
        afterRenderer={(TD, row, col, prop, value, cellProperties) => {
          if (
            value &&
            filter &&
            value.toString().toLowerCase().includes(filter[0]?.toLowerCase())
          ) {
            TD.style.backgroundColor = "#fdff70";
          }

          if (col + 1 === headers.length) {
            TD.style.display = "none";
          }
        }}
        fixedColumnsLeft={frozen}
        afterGetColHeader={renderHeaderComponent}
        hiddenColumns={{ columns: hidden, indicators: true }}
        afterColumnResize={async (
          newSize: number,
          column: number,
          isDoubleClick: boolean,
        ) => {
          await handleResize(column, newSize, template);
        }}
        afterColumnMove={(
          movedColumns: number[],
          finalIndex: number,
          dropIndex: number | undefined,
          movePossible: boolean,
          orderChanged: boolean,
        ) => {
          if (!orderChanged) return;

          let newColumns = [...columns];
          movedColumns.forEach((oldIndex) => {
            const movedColumn = newColumns.splice(oldIndex, 1)[0];
            newColumns.splice(finalIndex, 0, movedColumn);
            finalIndex += 1;
          });

          newColumns = newColumns.map((item, index) => {
            if (Object.keys(item).length) {
              return {
                ...item,
                order: index.toString(),
              };
            }
            return item;
          });

          setHeaders(newColumns.map((item) => item?.title ?? " "));
          setColumns(newColumns);
          handleMove(newColumns);
        }}
      />
    </>
  );
};

export default CustomTable;
