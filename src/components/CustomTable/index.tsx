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
        handleNewColumn
    } = useContext(productContext);
    const [cols, setCols] = useState<any[]>([]);
    const [columns, setColumns] = useState(headerTable);
    const [frozen, setFrozen] = useState<number>(0);
    const [headers, setHeaders] = useState<string[]>(colHeaders);
    const [filteredData, setFilteredData] = useState(dataProvider);
    const [filterText, setFilterText] = useState('');

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

    const updateHeadersBasedOnHidden = useCallback(() => {
        const updatedHeaders = colHeaders.map((item, index) => {
            if (hidden.includes(index)) {
                return null;
            }
            return item;
        });
        setHeaders(updatedHeaders);
    }, [hidden, colHeaders]);

    const customHidden =  useCallback((col: any) => {
        handleHidden(Number(col?.order), template, true);
    }, []);

    const handleMountColumns = () => {
        const columnsCustom: any[] = [];
        columns.sort().forEach((column) => {
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

            // setCustomColumns((customs) => ([col.type]?.push(col.data), [...customs]));
            columnsCustom.push({
                data: column.data,
                className: column.className,
                width: (column?.order == undefined) ? '193' : column.width,
                frozen: column.frozen,
                order: column.order,
                hidden: column.hidden,
                // columnSorting: {
                //     indicator: true,
                //     headerAction: false,
                //     compareFunctionFactory(sortOrder, columnMeta) {
                //     }
                // }
            });

            // const testing = headers.filter((item, index) => !hidden.includes(index) ?? item);
            // console.log({testing, hidden});
            // setHeaders(testing)
            // setHeaders(prev => {
            //     return prev.filter((item, index) => !toFreeze.includes(index) ?? item);
            // })
        })
        
        // const toHidden = columnsCustom.filter((item) => item.hidden).map((element) => element.order);
        // setHidden(columnsCustom.filter((item) => item.hidden).map((element) => Number(element?.order)));
        setCols(columnsCustom);
    }

    const renderHeaderComponent = useCallback((column: number, TH: HTMLTableHeaderCellElement) => {
        if (TH.querySelector(".customHeader") && column === -1) {
            TH.replaceChildren('')
            return ;
        }

        const existent = TH.querySelector(".customHeader");
        if (existent) {
            // ReactDOM.unmountComponentAtNode(existent);
            const myComponent = document.createElement("div");
            myComponent.className = "customHeader"

            const col = template?.fields?.fields.find((item) => {
                if (item.id === columns[column]?.data) {
                    return item
                }
            });

            if (headers[column] === " ") {
                ReactDOM.render(
                    <NewColumnMemo
                        template={template}
                        newColumn={template}
                        setNewColumn={(newColumn) => {
                            //  = Math.floor(100000 + Math.random() * 900000).toString();
                            // console.log({newColumn, headerTable})
                            // handleNewColumn(newColumn);
                            // const newHeaders = headerTable.map((item) => item?.title);
                            // newHeaders.push(' ');
                            // console.log({newHeaders})
                            // setHeaders(newHeaders)
                            // setCurrentTemplate(prev => [...prev, newColumn])
                            // setHeaders(prev => {
                            //     return headerTable.map((item) => item?.title)
                            // })

                            // setNewHeader(prev => {
                            //     const newColumns = [...prev];
                            //     const position = newColumns.length - 1; // penúltima posição
                            //     newColumns.splice(position, 0, newColumn?.title);
                            //     return newColumns;
                            // })

                            // setColumns(prev => {
                            //     const newColumns = [...prev];
                            //     const position = newColumns.length - 1; // penúltima posição
                            //     newColumns.splice(position, 0, newColumn);
                            //     return newColumns;
                            // });
                        }
                    } />,
                    myComponent
                );
            } else {
                ReactDOM.render(
                <CellMemo
                    label={headers[column]}
                    column={col}
                    template={template}
                    handleHidden={() => handleHidden(Number(col?.order), template, true)}
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
                                const colWidth = columns.filter((item) => {
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
                />, myComponent);
            }
            
            TH.replaceChildren(myComponent);
            return;
        }

        const myComponent = document.createElement("div");
        myComponent.className = "customHeader";
        
        TH.replaceChildren(myComponent)
    }, [headerTable, hidden]);

    const filterData = () => {
        const filterWords = filterText.split(' ').filter(word => word !== '');
    
        const filtered = dataProvider.filter(row => {
          return filterWords.some(word => {
            return row.some(cell => {
              return cell.toString().toLowerCase().includes(word.toLowerCase());
            });
          });
        });
    
        setFilteredData(filtered);
    };

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
                data={filteredData}
                width="100%"
                stretchH="all"
                manualColumnResize={true}
                manualRowResize
                // manualColumnMove
                viewportRowRenderingOffset={10}
                viewportColumnRenderingOffset={999}
                renderAllRows={false}
                maxRowHeight={51}
                rerenderOnColumnResize={false}
                rowHeaders
                autoRowSize
                // allowInsertColumn
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
                rowHeights="52px"
                licenseKey="non-commercial-and-evaluation"
                beforeChange={(changes: Array<CellChange | null>, source: ChangeSource) => {
                    const currentCellValue = changes[0][2];
                    const newValue = changes[0][3];
                    const row = changes[0][0];
                    const col = cols.findIndex((col) => col?.data === changes[0][1]);
                    const columnType = columns[col]?.type;

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
                    if (col+1 === headers.length) {
                      TD.style.display = 'none';
                    }
                }}
                fixedColumnsLeft={frozen}
                afterGetColHeader={renderHeaderComponent}
                hiddenColumns={{columns: hidden, indicators: true}}
                afterColumnResize={async (newSize: number, column: number, isDoubleClick: boolean) => {
                    await handleResize(column, newSize, template)
                }}
                // afterColumnMove={(movedColumns: number[], finalIndex: number, dropIndex: number | undefined, movePossible: boolean, orderChanged: boolean) => {
                //     const newColumns = [...columns];
                //     movedColumns.forEach((oldIndex) => {
                //     const movedColumn = newColumns.splice(oldIndex, 1)[0];
                //     newColumns.splice(finalIndex, 0, movedColumn);
                //     finalIndex += 1;
                //     });

                //     handleMove(newColumns);
                // }}
            />
        </>
    )
};

export default CustomTable;
