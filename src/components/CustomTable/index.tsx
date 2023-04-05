/* eslint-disable */
import ReactDOM from "react-dom";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";

import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import {HotTable} from '@handsontable/react';

import {ColumnTypes, CustomTableProps} from "./CustomTable.d";
import {productContext} from "../../context/products";
import { TableField } from "../TableField";
import {Cell} from "../Cell/index"
import { NewColumn } from "../NewColumn";
import { toast } from "react-toastify";
import { CellChange, ChangeSource } from "handsontable/common";

registerAllModules();

const CellMemo = React.memo(Cell);
const NewColumnMemo = React.memo(NewColumn);
const TableFieldMemo = React.memo(TableField);

const CustomTable: React.FC<CustomTableProps> = ({dataProvider, colHeaders}) => {
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
        filter
    } = useContext(productContext);
    const [cols, setCols] = useState<any[]>([]);
    const [columns, setColumns] = useState(headerTable);
    const [frozen, setFrozen] = useState<number>(0);
    const [headers, setHeaders] = useState<string[]>(colHeaders);
    const [currentTemplate, setCurrentTemplate] = useState<any>(template);

    const customRenderer = (
        td: HTMLTableCellElement,
        customComponent: React.ReactElement
    ): void => {
        if (!td) return;

        const tdNode = ReactDOM.findDOMNode(td);
        td.innerText = '';

        const myComponent = document.createElement("div");
        myComponent.className = "customComponent htMiddle";

        ReactDOM.render(customComponent, myComponent);
        tdNode.appendChild(myComponent);
    }

    const handleMountColumns = () => {
        const columnsCustom: any[] = [];
        headerTable.sort().forEach((column) => {
            if (Object.keys(COMPONENT_CELL_PER_TYPE).includes(column.type?.toString().toUpperCase())) {
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
                        let initialValue: any[] = typeof dataProvider[row]?.[column.data] !== "object" ? [dataProvider[row]?.[column.data]] : dataProvider[row]?.[column.data];
                        if (initialValue.includes(undefined)) {
                            initialValue = [""];
                        }

                        customRenderer(
                            td,
                            <TableFieldMemo
                                value={initialValue}
                                type={column.type}
                                options={column.options}
                                handleSetNewValue={(e: string|number) => {
                                    const value = typeof e === "object" ? e : [e];
                                    instance.setDataAtCell(row, col, value);
                                    return false;
                                }}
                            />
                        );
                    },
                });

                return;
            }

            columnsCustom.push({
                data: column.data,
                className: column.className,
                width: (column?.order == undefined) ? '193' : column.width,
                frozen: column.frozen,
                order: column.order,
                hidden: column.hidden,
            });
        })

        setCols(columnsCustom);
    };

    const [iconClicked, setIconClicked] = useState<boolean>(true);

    const beforeColumnMove = useCallback((movedColumns, finalIndex) => {
        return iconClicked
    }, [iconClicked]);

    const renderHeaderComponent = useCallback((column: number, TH: HTMLTableHeaderCellElement) => {
        if (TH.querySelector(".customHeader") && column === -1) {
            TH.replaceChildren('')
            return ;
        }

        const existent = TH.querySelector(".customHeader");
        if (existent) {
            ReactDOM.unmountComponentAtNode(existent);
            const myComponent = document.createElement("div");
            myComponent.className = "customHeader"

            const col = currentTemplate?.fields?.fields.find((item) => {
                if (item.id === headerTable[column]?.data) {
                    return item
                }
            });

            if (headers[column] === " ") {
                ReactDOM.render(
                    <NewColumn
                        test={() => setIconClicked(false)}
                        template={currentTemplate}
                        newColumn={currentTemplate}
                        setNewColumn={(newColumn, templateUpdated) => {
                            const fields = currentTemplate;
                            fields.fields.fields = templateUpdated;
                            setCurrentTemplate(fields);

                            newColumn = {
                                ...newColumn,
                                className: "htLeft htMiddle",
                                frozen: false,
                                hidden: false,
                                order: headerTable.length.toString(),
                                width: "300"
                            };

                            handleNewColumn(newColumn, templateUpdated);

                            const contentHeaders = headerTable.map((item) => item?.title);
                            contentHeaders.splice(headerTable.length -1, 1);
                            contentHeaders.push(newColumn?.title);
                            contentHeaders.push(" ");
                            setHeaders(contentHeaders);
                        }
                    } />,
                    myComponent
                );
            } else {
                ReactDOM.render(
                <Cell
                    label={headers[column]}
                    column={col}
                    template={currentTemplate}
                    handleHidden={() => {
                        handleHidden(column, currentTemplate, true)}
                    }
                    handleFrozen={(e, operation) => {
                        if (operation == "unfreeze") {
                            setFrozen(0);
                            handleFreeze(column, false, "unfreeze");

                            setColumns(prev => {
                                return prev.map((item) => {
                                    return {
                                        ...item,
                                        frozen: false
                                    }
                                })
                            })

                            return true;
                        } else {
                            if (col?.order == e) {
                                const colWidth = headerTable.filter((item) => {
                                    if (Number(item?.order) <= Number(e)) return item
                                }).map((element) =>
                                    Number(element?.width.replace('px', ''))
                                ).reduce((before, after) => before + after);
        
                                const tableWidth = hotRef.current!?.__hotInstance.rootElement.clientWidth
                                if (colWidth && tableWidth && colWidth > tableWidth * 0.65) {
                                    toast.warn("A coluna selecionada excede o limite de visualização da tela")
                                    return false;
                                }
        
                                handleFreeze(column, true);
                                setColumns(prev => {
                                    return prev.map((item, index) => { 
                                        if (index == column) {
                                            return {
                                                ...item,
                                                frozen: true,
                                            }
                                        }
                                        return item;
                                    })
                                })

                                setFrozen(column+1)
                            }
                            return true;
                        }
                    }}
                    freeze={headerTable[column]?.frozen}
                    handleSort={(e, operation) => {
                        // setData(data.sort((a, b) => {
                        //     if (a[col?.data] == b[col?.data]) return 0;
                        //     if (a[col?.data] < b[col?.data]) return 1
                        //     return -1;
                        // }))
                    }}
                    test={() => {
                        setIconClicked(false)
                    }}
                    test1={() => {
                        setIconClicked(true)
                    }}
                />, myComponent);
            }
            
            TH.replaceChildren(myComponent);
            return;
        }

        const myComponent = document.createElement("div");
        myComponent.className = "customHeader";
        
        TH.replaceChildren(myComponent)
    }, [headerTable, hidden, headers, currentTemplate]);

    useEffect(() => {
        const toFreeze = headerTable.filter((item) => item?.frozen === true);
        if (toFreeze.length > 0) {
            setFrozen(toFreeze.length);
        }

        handleMountColumns();
    }, [headerTable, frozen, hidden]);

    return (
        <>
            <HotTable
                ref={hotRef}
                height="100%"
                colHeaders={headers}
                columns={cols}
                data={dataProvider}
                width="100%"
                stretchH="all"
                manualColumnResize={true}
                // manualRowResize
                beforeColumnMove={beforeColumnMove}
                manualColumnMove
                viewportRowRenderingOffset={10}
                viewportColumnRenderingOffset={999}
                renderAllRows={false}
                rerenderOnColumnResize={false}
                rowHeaders
                autoRowSize
                columnSorting={{sortEmptyCells: false, headerAction: false}}
                contextMenu={{
                    items: {
                        'remove_row': {
                            name: 'Excluir produto',
                            callback(key: string, selection: Selection[], clickEvent: MouseEvent) {
                                handleDelete(dataProvider[selection[0].start.row]);
                            }
                        }
                    },
                    className: "menuContext"
                }}
                maxRowHeight={51}
                rowHeights="52px"
                licenseKey="non-commercial-and-evaluation"
                beforeChange={(changes: Array<CellChange | null>, source: ChangeSource) => {
                    const currentCellValue = changes[0][2];
                    const newValue = changes[0][3];
                    const row = changes[0][0];
                    const col = cols.findIndex((col) => col?.data === changes[0][1]);
                    const columnType = headerTable[col]?.type;

                    if (columnType === 'text' && newValue.length > 100) {
                        toast.warn("The text field cannot be longer than 100 characters");
                        return false;
                    }
                    if (columnType === 'paragraph' && newValue.length > 255) {
                        toast.warn("O campo parágrafo deve conter até 200 caractéres");
                        return false;
                    }
                    return true;
                }}
                afterChange={async (changes, source) => {
                    if (changes?.length && (changes[0][2] !== changes[0][3])) {
                        await handleSave(dataProvider[changes[0][0]]);
                    }
                }}
                afterRenderer={(TD, row, col, prop, value, cellProperties) => {
                    if (value && value.toString().toLowerCase().includes(filter?.toLowerCase())) {
                        TD.style.backgroundColor = "#fdff70";
                    }

                    if (col+1 === headers.length) {
                      TD.style.display = 'none';
                    }
                }}
                fixedColumnsLeft={frozen}
                afterGetColHeader={renderHeaderComponent}
                hiddenColumns={{columns: hidden, indicators: true}}
                afterColumnResize={async (newSize: number, column: number, isDoubleClick: boolean) => {
                    await handleResize(column, newSize, currentTemplate)
                }}
                afterColumnMove={(movedColumns: number[], finalIndex: number, dropIndex: number | undefined, movePossible: boolean, orderChanged: boolean) => {
                    let newColumns = [...columns];
                    movedColumns.forEach((oldIndex) => {
                    const movedColumn = newColumns.splice(oldIndex, 1)[0];
                    newColumns.splice(finalIndex, 0, movedColumn);
                    finalIndex += 1;
                    });

                    setHeaders(newColumns.map((item) => item?.title ?? " "));
                    newColumns = newColumns.map((item, index) => {
                        if (Object.keys(item).length) {
                            return {
                                ...item,
                                order: index.toString()
                            }
                        }

                        return item;
                    });
                    
                    setColumns(newColumns);
                    handleMove(newColumns);
                }}
            />
        </>
    )
};

export default CustomTable;
