/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
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
import { useNavigate } from "react-router-dom";
import { CellValue, RangeType } from "handsontable/common";
import { ReactComponent as EllipsisIcon } from "../../assets/ellipsis.svg";
import { ReactComponent as DownloadIcon } from "../../assets/download.svg";
import { ReactComponent as PlusIcon } from "../../assets/add.svg";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-left.svg";
import { ReactComponent as FlagIcon } from "../../assets/icons/flag.svg";
import { ReactComponent as EditIcon } from "../../assets/x-edit.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";

import "handsontable/dist/handsontable.full.min.css";

import { CustomTableProps } from "./CustomTable.d";
import { productContext } from "../../context/products";
import { TableField } from "../TableField";
import { Cell } from "../Cell/index";
import { NewColumn } from "../NewColumn";
import { Confirmation } from "../Confirmation";

import { Loading } from "../Loading";
import RadioEditor from "./Editors/Radio";
import DropdownEditor from "./Editors/Dropdown";
import RelationEditor from "./Editors/Relation";
import { FileEditor } from "./Editors/File";
import { getFilenameFromUrl } from "../../utils";
import {
  Content,
  Contents,
  Filters,
  Header,
  IconTemplate,
  Item,
  LeftContent,
  MoreOptions,
  RightContent,
  Title,
} from "../../pages/products/styles";
import { ROUTES } from "../../constants/routes";
import Button from "../Button";
import { Temp } from "../Temp";
import { productRequests } from "../../services/apis/requests/product";
import { Container } from "./styles";

registerAllModules();
registerAllEditors();

const CustomTable: React.FC<CustomTableProps> = () => {
  const hotRef = useRef<HotTable>(null);
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
  } = useContext(productContext);

  const [cols, setCols] = useState<any[]>([]);
  const [isTableLocked, setIsTableLocked] = useState(false);

  // Deverá ser removido
  const [currentCell, setCurrentCell] = useState<any>({});

  // Deverá ser removido
  const [columns, setColumns] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>(colHeaders);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [dataProvider, setDataProvider] = useState<any[]>(products ?? []);

  const navigate = useNavigate();

  const handleMountColumns = () => {
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
          // readOnly: true,
          // editor: RadioEditor,
          // bucket_url: column.bucket_url,
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

      // console.log(fields, newColumns, contentHeaders, column);
      handleRemoveColumn(
        Number(currentCell?.order),
        fields,
        newColumns,
        currentCell?.id,
      );

      // const { hotInstance } = hotRef.current!;
      // hotInstance?.alter("remove_col", column);

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
    setLoading(true);
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
          setLoading(false);

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
        setLoading(false);
        const hotInstance = hotRef.current!?.hotInstance;
        if (hotInstance) {
          hotInstance.render();
        }
        toast.error(errr.response.data.message);
      });
  };

  useEffect(() => {
    console.log("Rendered by effect 1");

    // const toFreeze = headerTable.filter((item) => item?.frozen === true);
    // if (toFreeze.length > 0) {
    //   setFrozen(toFreeze.length);
    // }

    setColumns(headerTable);
    handleMountColumns();

    setDataProvider(products);
  }, [headerTable]);

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (
  //       (event.ctrlKey || event.metaKey) &&
  //       event.key === "f" &&
  //       hotRef.current!?.hotInstance?.getSelected() !== undefined
  //     ) {
  //       event.preventDefault();
  //       const instance = hotRef.current!?.hotInstance;

  //       // if (!instance?.isListening()) {
  //       instance?.deselectCell();
  //       // }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  const handleSetNewValue = React.useCallback(
    (props: any) => {
      const { row, data, value } = props;

      setDataProvider((prev) =>
        prev.map((element, index) => {
          if (index == row) {
            return (element = value);
          }

          return element;
        }),
      );
    },
    [hotRef],
  );

  async function handleDataChange(
    row: any,
    prop: any,
    oldValue: any,
    newValue: any,
  ) {
    const isNew = !!dataProvider[row].id;

    if (oldValue !== newValue && dataProvider.length) {
      try {
        if (!isNew) setIsTableLocked(true);

        const id = await handleSave(
          dataProvider[row],
          isNew,
          dataProvider[row]?.id,
        );
        if (
          id &&
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
            id.toString(),
          )
        ) {
          const updated = dataProvider;
          updated[row].id = id;
          setDataProvider(updated);
        }
      } catch (error) {
        // toast.error(error);
      } finally {
        if (!isNew) setIsTableLocked(false); // Desbloqueia o Handsontable
      }
    } else {
      // setIsTableLocked(false); // Desbloqueia o Handsontable se não entrar na condição
    }
  }

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
      const total = value ? value.length : 0;
      td.innerHTML = `<div class="tagContent">${total} Items relacionados</div>`;
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
      cellProperties: Handsontable.CellProperties,
    ) => {
      if (value?.length > 0) {
        td.innerHTML = value
          .map((url: string) => {
            const fileNameWithExtension = getFilenameFromUrl(url);
            if (fileNameWithExtension) {
              const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
              const fileName = fileNameWithExtension.substring(0, lastDotIndex);
              const fileType = fileNameWithExtension.substring(
                lastDotIndex + 1,
              );
              if (
                !["jpg", "jpeg", "png", "thumb"].includes(
                  fileType.toLowerCase(),
                )
              ) {
                const icon = "https://prod-listme.s3.amazonaws.com/file.svg";
                return `<div class="fileItem" title="${fileName}">
                  <img src="${icon}" style="width:25px;height:25px;margin-right:4px;">
                  <a href="${url}" download />
                </div>`;
              }

              return `
                  <img class="imgItem" title="${fileName}" src="${url}" style="width:25px;height:25px;margin-right:4px;" onerror="this.onerror=null;this.src='https://d1ptd3zs6hice0.cloudfront.net/users-data-homolog/IMG_IJ06ikQw9qqGOhPdTBpz.png';">
                `;
            }
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
          handleDeleteColumn(Number(currentCell.order));
        }}
      />
      <>
        <Content>
          <Header>
            <LeftContent>
              <ArrowIcon
                onClick={() => {
                  // setDataProvider([]);
                  // setHeaderTable([]);
                  // setFilteredData([]);
                  // setColumns([]);
                  navigate(ROUTES.TEMPLATES);
                }}
              />
              <IconTemplate>
                <FlagIcon />
              </IconTemplate>
              <Title> {template?.name} </Title>
              <EditIcon />
            </LeftContent>
            <RightContent>
              <MoreOptions>
                <EllipsisIcon />
              </MoreOptions>
              <Button height="52px" width="227px" isSecondary>
                <DownloadIcon />
                Importar produtos
              </Button>
              <Button
                height="52px"
                width="226px"
                className="secondButton"
                onClick={() => {
                  const { hotInstance } = hotRef.current!;
                  if (hotInstance) {
                    if (hotInstance.isEmptyRow(0))
                      return toast.warn("Preencha o produto atual");
                  }
                  setDataProvider((prev) => [{}, ...prev]);
                }}
              >
                Adicionar produto
                <PlusIcon />
              </Button>
            </RightContent>
          </Header>
          <Filters>
            <Temp
              options={headerTable}
              handleSearch={handleGetProductFiltered}
            />
            <Contents>
              <Item>
                <HelpIcon />
                Ajuda
              </Item>
            </Contents>
          </Filters>
        </Content>
        {/* {loading ? (
          <Loading />
        ) : ( */}
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
            viewportRowRenderingOffset={100}
            viewportColumnRenderingOffset={100}
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
            afterChange={async (changes: Handsontable.CellChange[] | null) => {
              if (changes !== null && changes?.length && !isTableLocked) {
                const isNew = !!dataProvider[changes[0][0]].id;
                const customChanges = changes as Handsontable.CellChange[];
                if (
                  customChanges[0][2] !== customChanges[0][3] &&
                  dataProvider.length
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
                  }
                }
              }
            }}
            afterPaste={async (data: CellValue[][], coords: RangeType[]) => {
              if (data.length && !isTableLocked) {
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
                    const value = Object.keys(COMPONENT_CELL_PER_TYPE).includes(
                      column.type.toString().toUpperCase(),
                    )
                      ? [data[0][index]]
                      : data[0][index];
                    changes[column.field] = value;
                  });

                  changesPromises.push(handleSave(changes, true, changes?.id));
                }

                await Promise.all(changesPromises);
                const { hotInstance } = hotRef.current!;
                if (hotInstance) {
                  hotInstance.render();
                }
              }
            }}
            // beforeChange={(changes: (Handsontable.CellChange | null)[], source) => {
            //   // if (changes.length) {
            //   //   const customChanges = changes as Handsontable.CellChange[];
            //   //   if (customChanges[0][2] != customChanges[0][3] && dataProvider) {
            //   //     const { hotInstance } = hotRef.current!;
            //   //     const requiredFields = template.fields.fields
            //   //       .filter((field: any) => {
            //   //         return field.required;
            //   //       })
            //   //       .map((filtered: any) => filtered.id);
            //   //     const newDataProvider = dataProvider;
            //   //     // eslint-disable-next-line prefer-destructuring
            //   //     newDataProvider[customChanges[0][0]][customChanges[0][1]] =
            //   //       customChanges[0][3];
            //   //     const currentFields = Object.keys(
            //   //       newDataProvider[customChanges[0][0]],
            //   //     ).filter(
            //   //       (key) => newDataProvider[customChanges[0][0]][key]?.length,
            //   //     );
            //   //     const allElementsExist = requiredFields.every((elem: any) =>
            //   //       currentFields.includes(elem),
            //   //     );
            //   //     if (!allElementsExist && hotInstance) {
            //   //       const metaExists = hotInstance
            //   //         .getCellMetaAtRow(customChanges[0][0])
            //   //         .find((e) => e.className == "invalid-cell");
            //   //       if (metaExists) return true;
            //   //       requiredFields.forEach((key: any, index: number) => {
            //   //         const currentClassName = hotInstance.getCellMeta(
            //   //           customChanges[0][0],
            //   //           index,
            //   //         ).className;
            //   //         if (currentClassName !== "invalid-cell") {
            //   //           hotInstance.setCellMeta(
            //   //             customChanges[0][0],
            //   //             index,
            //   //             "className",
            //   //             "invalid-cell",
            //   //           );
            //   //         }
            //   //       });
            //   //       return;
            //   //     }
            //   //     if (hotInstance && requiredFields.includes(customChanges[0][1])) {
            //   //       requiredFields.forEach((key: any, index: number) => {
            //   //         const currentClassName = hotInstance.getCellMeta(
            //   //           customChanges[0][0],
            //   //           index,
            //   //         ).className;
            //   //         if (currentClassName == "invalid-cell") {
            //   //           hotInstance.setCellMeta(
            //   //             customChanges[0][0],
            //   //             index,
            //   //             "className",
            //   //             "",
            //   //           );
            //   //         }
            //   //       });
            //   //       setEnable();
            //   //       return;
            //   //     }
            //   //   }
            //   // }
            // }}
            // afterSelection={(
            //   row: number,
            //   column: number,
            //   row2: number,
            //   column2: number,
            //   preventScrolling: { value: boolean },
            //   selectionLayerLevel: number,
            // ) => {
            //   console.log();
            // }}
            afterRenderer={(TD, row, col, prop, value, cellProperties) => {
              if (col + 1 === headers.length) {
                TD.style.display = "none";
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
              setColumns(newColumns);
              handleMove(newColumns);
            }}
          >
            {cols.map((col: any, index: number) => {
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
                      // column={col}
                      // dataProvider={dataProvider}
                    />
                  </HotColumn>
                );
              }

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
      </>
    </>
  );
};

export default CustomTable;
