/* eslint-disable */
import ReactDOM from "react-dom";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";

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
interface CellType {
    row: number;
    col: number;
}
const CustomTable: React.FC<CustomTableProps> = ({
    dataProvider,
    colHeaders
}) =>  {
    const hotRef = useRef<Handsontable | null>(null);
    const {
        handleSave,
        handleDelete,
        handleAdd,
        template,
        COMPONENT_CELL_PER_TYPE,
        headerTable
    } = useContext(productContext);
    const [cols, setCols] = useState<ColumnTypes>();
    const [columns, setColumns] = useState(headerTable);
    const [newHeader, setNewHeader] = useState(colHeaders);
    const [currentTemplate, setCurrentTemplate] = useState(template.fields.fields);
    const [currentCell, setCurrentCell] = useState<CellType|undefined>(undefined);

    const customRenderer = (
        td: HTMLTableCellElement,
        customComponent: React.ReactElement
    ): void => {
        ReactDOM.render(customComponent, td);
        td.className = "customComponent htMiddle";
    };

    const handleMountColumns: Function = (): void => {
        const columnsCustom: any[] = [];
        columns.sort().forEach((column) => {
            if (Object.keys(COMPONENT_CELL_PER_TYPE).includes(column.type?.toString().toUpperCase())) {
                columnsCustom.push({
                    data: column.data,
                    className: column.className,
                    // width: "fit-content",
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
                                <TableField
                                    // key={row+col}
                                    value={initialValue}
                                    type={column.type}
                                    options={column.options}
                                    handleGetNewValue={(e: string|number) => {
                                        const value = typeof e === "object"? e : [e];
                                        instance.setDataAtCell(row, col, value)
                                    }}
                            />);
                    },
                    // rendererOptions: {column}
                });

                return;
            }

            // setCustomColumns((customs) => ([col.type]?.push(col.data), [...customs]));
            columnsCustom.push({
                data: column.data,
                className: column.className,
            });
        })

        setCols(columnsCustom);
    };

    const afterGetColHeaders = (column: number, TH: HTMLTableHeaderCellElement, headerLevel: number) => {
        if (TH.querySelector(".customHeader") && column === -1) {
            TH.replaceChildren('')
            return ;
        } else if (TH.querySelector(".customHeader")) {
            return;
        }

        const test = TH.querySelector(".relative")
        test.style.display = "none";
        const thNode = ReactDOM.findDOMNode(TH);
        const myComponent = document.createElement('div');
        myComponent.className = "customHeader"

        const col = currentTemplate.find((item) => {
            if (item.id === columns[column]?.data) {
                return item
            }
        });

        if (newHeader[column] === " ") {
            ReactDOM.render(
                <NewColumn 
                    template={template}
                    newColumn={template}
                    setNewColumn={(newColumn) => {
                        // setCurrentTemplate(prev => [...prev, newColumn])

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
                } />, myComponent);
        } else {
            ReactDOM.render(<Cell label={newHeader[column]} column={col} template={template} />, myComponent);
        }

        return thNode.appendChild(myComponent);
    }

    useEffect(() => {
        handleMountColumns();
    }, [dataProvider, columns, newHeader]);

    return (
        <>
            <HotTable
                ref={hotRef}
                height="100%"
                colHeaders={newHeader}
                columns={cols}
                data={dataProvider}
                width="100%"
                // stretchH="all"
                manualColumnResize={true}
                manualRowResize={true}
                // viewportRowRenderingOffset={9999}
                viewportColumnRenderingOffset={9999}
                // renderAllRows={false}
                rowHeaders
                autoRowSize
                // allowInsertColumn
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
                        return false; // Prevent the change and keep the cell in the editing state
                    }
                    if (columnType === 'paragraph' && newValue.length > 255) {
                        toast.warn("O campo parágrafo deve conter até 200 caractéres");
                        return false; // Prevent the change and keep the cell in the editing state
                    }
                    return true;
                }}
                afterChange={(changes, source) => {
                    if (changes?.length && (changes[0][2] !== changes[0][3])) {
                        handleSave(dataProvider[changes[0][0]]);
                    }
                }}
                afterRenderer={(TD, row, col, prop, value, cellProperties) => {
                    if (col+1 === colHeaders.length) {
                      TD.style.display = 'none';
                    }
                }}
                afterGetColHeader={afterGetColHeaders}
                hiddenColumns
            /> 
        </>
    )
};

export default CustomTable;
