import ReactDOM from "react-dom/client";
import { unmountComponentAtNode } from "react-dom";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Handsontable from "handsontable";
import { registerAllEditors, registerAllModules } from "handsontable/registry";
import { HotColumn, HotTable } from "@handsontable/react";
import { toast } from "react-toastify";
import { CellValue, RangeType } from "handsontable/common";

import DocumentIcon from "../../assets/icons/document-icon.svg";
import ImageErrorIcon from "../../assets/icons/image-error-icon.svg";

import { ReactComponent as HelpIcon } from "../../assets/help.svg";

import "handsontable/dist/handsontable.full.min.css";

import { CustomTableProps } from "./CustomTable.d";
import { productContext } from "../../context/products";
import { Cell } from "../Cell/index";
import { NewColumn } from "../NewColumn";
import { Confirmation } from "../Confirmation";

import RadioEditor from "./Editors/Radio";
import DropdownEditor from "./Editors/Dropdown";
import RelationEditor from "./Editors/Relation";
import { FileEditor } from "./Editors/File";
import { getFilenameFromUrl, isEquivalent, generateUUID } from "../../utils";
import { Content, Contents, Filters, Item } from "../../pages/products/styles";
import { Temp } from "../Temp";
import { productRequests } from "../../services/apis/requests/product";
import { Container } from "./styles";
import { LoadingFetch } from "./LoadingFetch";
import HeaderTable from "./HeaderTable";
import FiltersComponent from "./Filters";
import handleDeleteColumn from "./utils/handleDeleteColumn";

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
  } = useContext(productContext);

  const [cols, setCols] = useState<any[]>([]);
  const [isTableLocked, setIsTableLocked] = useState(false);
  const [page, setPage] = useState<number>(1);

  const [currentCell, setCurrentCell] = useState<any>({});

  const [columns, setColumns] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>(colHeaders);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [dataProvider, setDataProvider] = useState<any[]>(products ?? []);

  const handleMountColumns = (): void => {
    const columnsCustom: any[] = [];
    headerTable.sort().forEach((column) => {
      if (
        Object.keys(COMPONENT_CELL_PER_TYPE).includes(
          column.type?.toString()?.toUpperCase(),
        )
      ) {
        columnsCustom.push({
          data: column.data,
          className: column.className,
          order: column.order,
          width: column.width,
          frozen: column.frozen,
          hidden: column.hidden,
          type: column.type,
          options: column.options,
          isCustom: true,
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
        isCustom: false,
        // editor: Text,
        type: "text",
      });
    });

    setCols(columnsCustom);
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
              handleFrozen={(e: any, operation: any) => {
                // if (operation == "unfreeze") {
                //   setFrozen(0);
                //   handleFreeze(column, false, "unfreeze");

                //   setColumns((prev) => {
                //     return prev.map((item) => {
                //       return {
                //         ...item,
                //         frozen: false,
                //       };
                //     });
                //   });

                //   return true;
                // }
                // // if (col?.order == e) {
                // const colWidth = headerTable
                //   .filter((item) => {
                //     if (Number(item?.order) <= Number(col?.order)) return item;
                //   })
                //   .map((element) => {
                //     if (element.width)
                //       return Number(element.width.replace("px", ""));
                //   });

                // // if (colWidth).reduce((before, after) => before + after);

                // // const tableWidth = hotRef.current!?.__hotInstance.rootElement.clientWidth
                // // if (colWidth && tableWidth && colWidth > tableWidth * 0.65) {
                // //     toast.warn("A coluna selecionada excede o limite de visualização da tela")
                // //     return false;
                // // }

                // const test = columns.map((item, index) => {
                //   if (index == column) {
                //     return {
                //       ...item,
                //       frozen: true,
                //     };
                //   }
                //   return item;
                // });

                // col.frozen = true;
                // setColumns((prev) => {
                //   return prev.map((item, index) => {
                //     if (index == column) {
                //       return {
                //         ...item,
                //         frozen: true,
                //       };
                //     }
                //     return item;
                //   });
                // });

                // setFrozen(column + 1);

                const freezePlugins =
                  hotRef.current!.hotInstance?.getPlugin("manualColumnFreeze");

                if (freezePlugins) {
                  freezePlugins?.freezeColumn(1);
                  // setFrozen(column + 1);
                  hotRef.current!.hotInstance?.render();
                }
                // handleFreeze(col, true);
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

  const handleGetProductFiltered = (keyword: string): void => {
    // setLoading(true);
    loadingRef.current!.style.display = "block";

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
          // setLoading(false);
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
        // setLoading(false);
        loadingRef.current!.style.display = "none";

        const hotInstance = hotRef.current!?.hotInstance;
        if (hotInstance) {
          hotInstance.render();
        }
        toast.error(errr.response.data.message);
      });
  };

  const onDrop = async (event: DragEvent): Promise<void> => {
    const target = event.target as HTMLElement;
    const cellElement = target.closest(".handsontable .file-cell");
    if (cellElement) {
      const row: number = Number(cellElement.getAttribute("data-row"));
      const column: number = Number(cellElement.getAttribute("data-col"));
      try {
        if (event.dataTransfer?.files.length) {
          const { files } = event.dataTransfer;
          const parsedFiles: Array<File> = Array.from(files);
          const newFiles: Array<string> | void = await uploadImages(
            parsedFiles,
            template.id,
          );
          if (newFiles && newFiles.length) {
            console.log(this);

            // this.setState(
            //   { newValue: [...this.state.newValue, ...newFiles] },
            //   () => {
            //     // this.finishEditing();
            //   },
            // );
          }
          //   },
          // )
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    // const toFreeze = headerTable.filter((item) => item?.frozen === true);
    // if (toFreeze.length > 0) {
    //   setFrozen(toFreeze.length);
    // }

    setColumns(headerTable);
    handleMountColumns();

    setDataProvider(products);

    // const dropHandler = async (event: DragEvent): Promise<void> => {
    //   const target = event.target as HTMLElement;
    //   if (target && target.matches(".handsontable .fileCell")) {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     const { hotInstance } = hotRef.current!;
    //     if (hotInstance && event.dataTransfer?.files.length) {
    //       const { files } = event.dataTransfer;
    //       // setDroppedFiles(Array.from(files));
    //       // const { col, row } = hotInstance.getCoords(target);
    //       // await onDrop(files, col, row);
    //     }
    //   }
    // };
  }, [headerTable]);

  const getRowsInterval = (start: number, end: number): Array<number> => {
    if (start > end) {
      [start, end] = [end, start];
    }

    const result: Array<number> = [];
    for (let i: number = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  };

  const customRenderer = useCallback(
    (
      instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      col: number,
      prop: string | number,
      value: any,
      cellProperties: Handsontable.CellProperties,
    ) => {
      if (typeof value === "string" && value.length) value = JSON.parse(value);

      const totalItems = value ? value.length : 0;
      td.innerHTML = `<div class="tagContent">${totalItems} Items relacionados</div>`;
    },
    [],
  );

  const customRendererFile = useCallback(
    (
      instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      col: number,
      prop: string | number,
      value: any,
    ) => {
      td.className = "file-cell";

      td.draggable = true;
      td.ondragover = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      td.ondragleave = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        td.classList.remove("drag-over");
      };

      td.ondragenter = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const target = event.target as HTMLElement;
        if (target.tagName === "TD") {
          td.classList.add("drag-over");
        }
      };

      td.ondrop = async (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const { hotInstance } = hotRef.current!;
        const target = event.target as HTMLElement;
        const cellElement = target.closest(".handsontable .file-cell");
        if (cellElement && hotInstance) {
          td.classList.remove("drag-over");
          loadingRef.current!.style.display = "block";
          try {
            let currentValue: Array<string> = JSON.parse(
              cellElement.getAttribute("data-new-value") || "[]",
            );

            if (value && typeof value === "object")
              currentValue = currentValue
                .filter((item: any) => !value.includes(item))
                .concat(
                  value?.filter((item1: any) => !currentValue.includes(item1)),
                );

            if (event.dataTransfer?.files.length) {
              const { files } = event.dataTransfer;
              const parsedFiles: Array<File> = Array.from(files);
              const newFiles: Array<string> | void = await uploadImages(
                parsedFiles,
                template.id,
              );

              if (newFiles && newFiles.length) {
                let newValue = [];
                if (currentValue) {
                  if (typeof currentValue === "object") {
                    newValue = [...currentValue, ...newFiles];
                  } else {
                    newValue = [currentValue, ...newFiles];
                  }
                } else {
                  newValue = [...newFiles];
                }

                const changes: any = hotInstance.getSourceDataAtRow(row);
                changes[prop] = newValue;
                hotInstance.setDataAtCell(row, col, newValue);
              }
            }

            hotInstance.selectCell(row, col + 1);

            loadingRef.current!.style.display = "none";
          } catch (error) {
            loadingRef.current!.style.display = "none";

            if (error instanceof Error) toast.error(error.message);
          }
        }
      };

      if (typeof value === "string" && value.length) {
        value = JSON.parse(value);
      }

      if (value?.length) {
        td.innerHTML = value
          .map((url: string) => {
            let imageSource: string = url;
            const fileNameWithExtension: string = getFilenameFromUrl(url);
            const lastDotIndex: number = fileNameWithExtension.lastIndexOf(".");
            const fileName: string = fileNameWithExtension.substring(
              0,
              lastDotIndex,
            );
            const fileType: string = fileNameWithExtension.substring(
              lastDotIndex + 1,
            );

            if (!["jpg", "jpeg", "png", "thumb", "svg"].includes(fileType)) {
              imageSource = DocumentIcon;
            }

            const placeholder: string = `<img class="imgItem" title="${fileNameWithExtension}" src="${ImageErrorIcon}" style="width:25px;height:25px;margin-right:4px;">`;

            fetch(url, { method: "HEAD", mode: "no-cors" })
              .then((response: Response) => {
                const contentLength: string | null =
                  response.headers.get("Content-Length");

                if (contentLength && parseInt(contentLength) <= 800 * 1024) {
                  td.innerHTML = `<img class="imgItem" title="${fileNameWithExtension}" src="${imageSource}" style="width:25px;height:25px;margin-right:4px;">`;
                }
              })
              .catch((error) => {
                console.error("Erro ao verificar o tamanho da imagem:", error);
              });

            return placeholder;
          })
          .join("");
      } else {
        td.innerHTML = "";
      }
    },
    [],
  );

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
          handleDeleteColumn(
            Number(currentCell.order),
            setIsOpen,
            template,
            currentCell,
            columns,
            cols,
            setCols,
            setHeaders,
            handleRemoveColumn,
          );
        }}
      />
      <>
        <Content>
          <HeaderTable
            hotRef={hotRef}
            setDataProvider={setDataProvider}
            template={template}
          />
          <FiltersComponent
            headerTable={headerTable}
            handleGetProductFiltered={handleGetProductFiltered}
          />
        </Content>
        <Container>
          <HotTable
            readOnly={isTableLocked}
            ref={hotRef}
            colHeaders={headers}
            columns={cols}
            data={dataProvider}
            height="100%"
            width="100%"
            stretchH="all"
            manualColumnResize
            filters
            autoRowSize={false}
            autoColumnSize={false}
            // beforeColumnMove={beforeColumnMove}
            manualColumnMove
            // manualColumnFreeze
            search
            renderAllRows={false}
            viewportRowRenderingOffset={200}
            viewportColumnRenderingOffset={30}
            rowHeaders
            columnSorting={{ sortEmptyCells: false, headerAction: false }}
            contextMenu={{
              items: {
                remove_row: {
                  name: "Excluir produto",
                  async callback(
                    key: string,
                    selection: any[],
                    clickEvent: MouseEvent,
                  ) {
                    if (dataProvider?.length == 1)
                      return toast.warn(
                        "O catálogo deve conter ao menos um produto",
                      );

                    if (dataProvider?.length) {
                      const { hotInstance } = hotRef.current!;
                      if (hotInstance) {
                        if (hotInstance.isEmptyRow(0))
                          return hotInstance?.alter(
                            "remove_row",
                            selection[0].start.row,
                          );

                        await handleDelete(
                          dataProvider[selection[0].start.row],
                        );
                        hotInstance?.alter(
                          "remove_row",
                          selection[0].start.row,
                        );
                      }
                    }
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
            afterChange={async (
              changes: Handsontable.CellChange[] | null,
              source: any,
            ) => {
              if (source === "CopyPaste.paste") return;

              const hotInstance = hotRef.current?.hotInstance;
              if (
                changes !== null &&
                changes?.length &&
                !isTableLocked &&
                hotInstance
              ) {
                const isNew = !!dataProvider[changes[0][0]].id;
                const customChanges = changes as Handsontable.CellChange[];
                if (
                  typeof customChanges[0][2] === "object" &&
                  typeof customChanges[0][3] === "object" &&
                  !isEquivalent(customChanges[0][2], customChanges[0][3])
                ) {
                  try {
                    if (!isNew) setIsTableLocked(true);
                    const id = await handleSave(
                      dataProvider[customChanges[0][0]],
                      isNew,
                      dataProvider[customChanges[0][0]]?.id,
                    );
                    if (
                      id &&
                      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
                        id.toString(),
                      )
                    ) {
                      const updated = dataProvider;
                      updated[customChanges[0][0]].id = id;
                      setDataProvider(updated);
                    }
                  } finally {
                    if (!isNew) setIsTableLocked(false);
                    console.log("BF");
                    return;
                  }
                }
                if (
                  typeof customChanges[0][2] !== "object" &&
                  customChanges[0][2] !== customChanges[0][3] &&
                  dataProvider.length
                ) {
                  console.log("Changes", { changes });
                  try {
                    if (!isNew) setIsTableLocked(true);
                    const id = await handleSave(
                      dataProvider[customChanges[0][0]],
                      isNew,
                      dataProvider[customChanges[0][0]]?.id,
                    );
                    if (
                      id &&
                      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
                        id.toString(),
                      )
                    ) {
                      const updated = dataProvider;
                      updated[customChanges[0][0]].id = id;
                      setDataProvider(updated);
                    }
                  } finally {
                    if (!isNew) setIsTableLocked(false);
                  }
                }
              }
            }}
            beforeCopy={(
              data: CellValue[][],
              coords: RangeType[],
              copiedHeadersCount: { columnHeadersCount: number },
            ) => {
              for (let i = 0; i < coords.length; i++) {
                const { startRow, startCol, endRow, endCol } = coords[i];
                for (let row = startRow; row <= endRow; row++) {
                  for (let col = startCol; col <= endCol; col++) {
                    const cellData = hotRef.current!.hotInstance?.getDataAtCell(
                      row,
                      col,
                    );
                    const cell = hotRef.current!?.hotInstance?.getCellMeta(
                      row,
                      col,
                    );

                    const column = cols.find((col) => col.data === cell?.prop);
                    if (
                      cellData &&
                      ["relation", "file", "checked"].includes(column.type)
                    ) {
                      data[row - startRow][col - startCol] =
                        JSON.stringify(cellData);
                    }
                  }
                }
              }
            }}
            afterPaste={async (data: CellValue[][], coords: RangeType[]) => {
              const { hotInstance } = hotRef.current!;
              if (data.length && !isTableLocked && hotInstance) {
                loadingRef.current!.style.display = "block";

                const range = coords[0];
                const fieldColumns = cols
                  .slice(range.startCol, range.endCol + 1)
                  .map((column) => {
                    return { field: column.data, type: column.type };
                  });

                const rangeOfRows: number = range.endRow - range.startRow + 1;
                const rows: number[] = getRowsInterval(
                  range.startRow,
                  range.endRow,
                );

                const changesPromises: Array<any> = [];
                for (let i = 0; rangeOfRows > i; i++) {
                  const row: number = rows[i];
                  const changes = dataProvider[row];

                  fieldColumns.forEach((column: any, index: number): void => {
                    const position: number = data.length > 1 ? i : 0;

                    if (
                      ["relation", "file", "checked"].includes(column.type) &&
                      data[position][index]
                    ) {
                      changes[column.field] = JSON.parse(data[position][index]);
                    } else {
                      let value = Object.keys(COMPONENT_CELL_PER_TYPE).includes(
                        column.type.toString().toUpperCase(),
                      )
                        ? [data[position][index]]
                        : data[position][index];

                      if (Array.isArray(value) && value[0] === "") {
                        value = [];
                      }
                      changes[column.field] = value;
                    }
                  });

                  changesPromises.push(changes);
                }

                for await (const item of changesPromises) {
                  const isNew: boolean = !!item?.id;
                  if (!isNew) item.id = item?.id ?? generateUUID();

                  await handleSave(item, isNew, item.id);
                }

                loadingRef.current!.style.display = "none";

                if (hotInstance) {
                  hotInstance.render();
                }
              }
            }}
            afterRenderer={(TD, row, col, prop, value, cellProperties) => {
              if (col + 1 === headers.length) {
                TD.style.display = "none";
              }
            }}
            afterScrollVertically={(): void => {
              const { hotInstance } = hotRef.current!;
              if (hotInstance) {
                const holder =
                  hotInstance.rootElement.querySelector(".wtHolder");
                if (holder) {
                  const scrollableHeight = holder.scrollHeight;
                  const { scrollTop } = holder;
                  const visibleHeight = holder.clientHeight;

                  if (
                    scrollTop + visibleHeight >= scrollableHeight &&
                    total > dataProvider.length
                  ) {
                    // setLoading(true);
                    loadingRef.current!.style.display = "block";
                    setIsTableLocked(true);
                    productRequests
                      .list(
                        { page, limit: 100 },
                        window.location.pathname.substring(10),
                      )
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

                          setDataProvider((prev) => [
                            ...prev,
                            ...productFields,
                          ]);

                          setPage(page + 1);
                          // setLoading(false);
                          loadingRef.current!.style.display = "none";

                          setIsTableLocked(false);
                        }
                      })
                      .catch((errr: any) => {
                        // setLoading(false);
                        loadingRef.current!.style.display = "none";

                        setIsTableLocked(false);

                        if (hotInstance) {
                          hotInstance.render();
                        }
                        toast.error(errr.response.data.message);
                      });
                  }
                }
              }
            }}
            fixedColumnsStart={1}
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
              handleMove(newColumns);
            }}
            afterDocumentKeyDown={(event: KeyboardEvent): void => {
              const { hotInstance } = hotRef.current!;
              if (hotInstance) {
                if (event.key === "ArrowRight" && event.ctrlKey) {
                  const selected = hotInstance.getSelected();
                  if (selected) {
                    const [startRow, , endRow] = selected[0];

                    let lastVisibleCol = hotInstance.countCols() - 2;
                    while (
                      hotInstance.getColWidth(lastVisibleCol) === 0 &&
                      lastVisibleCol >= 0
                    ) {
                      lastVisibleCol--;
                    }

                    if (lastVisibleCol >= 0) {
                      hotInstance.selectCell(
                        startRow,
                        lastVisibleCol,
                        endRow,
                        lastVisibleCol,
                      );
                    }
                  }
                  event.preventDefault();
                }
              }
            }}
          >
            {cols.map((col: any, index: number) => {
              if (col.isCustom && col.type === "list") {
                return (
                  <HotColumn
                    width={col.width}
                    _columnIndex={col.order}
                    data={col.data}
                    key={index}
                  >
                    <DropdownEditor
                      hot-editor
                      options={[...col.options, ""]}
                      editorColumnScope={0}
                    />
                  </HotColumn>
                );
              }

              if (col.isCustom && col.type === "radio") {
                return (
                  <HotColumn
                    width={col.width}
                    _columnIndex={col.order}
                    data={col.data}
                    key={index}
                  >
                    <RadioEditor
                      hot-editor
                      options={[...col.options, ""]}
                      editorColumnScope={0}
                    />
                  </HotColumn>
                );
              }

              if (col.isCustom && col.type === "file") {
                return (
                  <HotColumn
                    width={col.width}
                    _columnIndex={col.order}
                    data={col.data}
                    key={index}
                    renderer={customRendererFile}
                  >
                    <FileEditor
                      hot-editor
                      editorColumnScope={0}
                      templateId={template.id}
                      dataProvider={dataProvider}
                    />
                  </HotColumn>
                );
              }

              if (col.type === "relation") {
                return (
                  <HotColumn
                    _columnIndex={col.order}
                    data={col.data}
                    width={col.width}
                    key={index}
                    // eslint-disable-next-line react/jsx-no-bind
                    renderer={customRenderer}
                  >
                    <RelationEditor
                      hot-editor
                      editorColumnScope={0}
                      templateId={col.options[0].templateId}
                      column={col}
                      dataProvider={dataProvider}
                      field={col.options[0].field}
                    />
                  </HotColumn>
                );
              }

              return (
                <HotColumn
                  width={col.width}
                  _columnIndex={col.order}
                  data={col.data}
                  key={index}
                />
              );
            })}
          </HotTable>
        </Container>
        <div ref={loadingRef} style={{ display: "none" }}>
          <LoadingFetch />
        </div>
      </>
    </>
  );
};

export default CustomTable;
