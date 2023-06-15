import ReactDOM from "react-dom/client";
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
import { HotColumn, HotTable } from "@handsontable/react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { CustomTableProps } from "./CustomTable.d";
import { productContext } from "../../context/products";
import { TableField } from "../TableField";
import { Cell } from "../Cell/index";
import { NewColumn } from "../NewColumn";
import { Confirmation } from "../Confirmation";
import { productRequests } from "../../services/apis/requests/product";

import { ReactComponent as EllipsisIcon } from "../../assets/ellipsis.svg";
import { ReactComponent as DownloadIcon } from "../../assets/download.svg";
import { ReactComponent as PlusIcon } from "../../assets/add.svg";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-left.svg";
import { ReactComponent as FlagIcon } from "../../assets/icons/flag.svg";
import { ReactComponent as EditIcon } from "../../assets/x-edit.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import {
  Header,
  LeftContent,
  RightContent,
  MoreOptions,
  IconTemplate,
  Title,
  Filters,
  Contents,
  Item,
  Content,
} from "../../pages/products/styles";
import { ROUTES } from "../../constants/routes";
import Button from "../Button";
import { Loading } from "../Loading";
import { Temp } from "../Temp";

registerAllModules();

const TableFieldMemo = React.memo(TableField);

const CustomTable: React.FC<CustomTableProps> = ({ temp, colHeaders }) => {
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
    handleFreeze,
    handleNewColumn,
    handleMove,
    handleRemoveColumn,
    setHeaderTable,
    setFilteredData,
  } = useContext(productContext);
  console.log("Renderizado");

  const [cols, setCols] = useState<any[]>([]);
  const [currentCell, setCurrentCell] = useState<any>({});
  const [columns, setColumns] = useState<any[]>(headerTable);
  const [headers, setHeaders] = useState<string[]>(colHeaders ?? [""]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [dataProvider, setDataProvider] = useState<any[]>(temp ?? []);

  const navigate = useNavigate();

  const handleMountColumns = () => {
    const columnsCustom: any[] = [];
    columns.sort().forEach((column) => {
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
          readOnly: true,
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

      console.log(currentCell);
      // const { hotInstance } = hotRef.current!;
      // hotInstance?.alter("remove_col", column);

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
        ReactDOM.createRoot(existent).unmount();
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
        response?.products?.forEach((item: any) => {
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

        hotRef.current?.hotInstance?.loadData(productFields);
        const plugin = hotRef.current!.hotInstance?.getPlugin("search");
        plugin?.query(keyword);
        hotRef.current!?.hotInstance?.render();
      })
      .catch((errr: any) => {
        setLoading(false);
        hotRef.current!?.hotInstance?.render();
        toast.error(errr.response.data.message);
      });
  };

  useEffect(() => {
    console.log("Rendered by effect 1");
    // const toFreeze = headerTable.filter((item) => item?.frozen === true);
    // if (toFreeze.length > 0) {
    //   setFrozen(toFreeze.length);
    // }

    handleMountColumns();
  }, [dataProvider, headerTable]);

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

  return (
    <>
      <Content>
        <Header>
          <LeftContent>
            <ArrowIcon
              onClick={() => {
                setDataProvider([]);
                setHeaderTable([]);
                setFilteredData([]);
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
                  // hotInstance.alter(
                  //   "insert_row_above",
                  //   0,
                  //   1,
                  //   JSON.stringify([""]),
                  // );
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
            handleSetFilter={(value: any) => {
              // const filtersPlugin =
              //   hotRef.current!.hotInstance?.getPlugin("filters");
              // if (filtersPlugin !== undefined) {
              //   if (!value.length) {
              //     filtersPlugin.clearConditions();
              //     filtersPlugin.filter();
              //     return;
              //   }
              //   filtersPlugin.clearConditions();
              //   filtersPlugin?.addCondition(0, "contains", [value]);
              //   filtersPlugin?.filter();
              // }
            }}
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
      {loading ? (
        <Loading />
      ) : (
        <HotTable
          ref={hotRef}
          colHeaders={headers}
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
          viewportRowRenderingOffset={200}
          viewportColumnRenderingOffset={50}
          renderAllRows={false}
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
                  if (dataProvider?.length) {
                    const { hotInstance } = hotRef.current!;
                    if (hotInstance) {
                      if (hotInstance.isEmptyRow(0))
                        return hotInstance?.alter(
                          "remove_row",
                          selection[0].start.row,
                        );

                      await handleDelete(dataProvider[selection[0].start.row]);
                      hotInstance?.alter("remove_row", selection[0].start.row);
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
            source,
          ) => {
            if (changes !== null && changes?.length) {
              const customChanges = changes as Handsontable.CellChange[];
              if (
                customChanges[0][2] !== customChanges[0][3] &&
                dataProvider.length
              ) {
                const id = await handleSave(dataProvider[customChanges[0][0]]);
                if (id) dataProvider[customChanges[0][0]].id = id;
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
            if (col.isCustom) {
              return (
                <HotColumn
                  _columnIndex={col.order}
                  data={col.data}
                  width={col.width}
                  key={index}
                >
                  {/* <ToDelete hot-renderer /> */}
                  <TableFieldMemo
                    className="ok"
                    column={col}
                    instance={hotRef.current!?.hotInstance}
                    prop={col.data}
                    hot-renderer
                    // value={dataProvider[index] ?? [""]}
                    type={col.type}
                    options={col.options}
                    handleSetNewValue={handleSetNewValue}
                    dataProvider={dataProvider}
                  />
                </HotColumn>
              );
            }

            return <HotColumn data={col.data} width={col.width} />;
          })}
        </HotTable>
      )}
    </>
  );
};

export default CustomTable;
