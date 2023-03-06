/* eslint-disable */

import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";

import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import {HotTable} from '@handsontable/react';

import {ColumnTypes, CustomTableProps} from "./CustomTable.d";
import {productContext} from "../../context/products";
import TextAltIcon from "../../assets/text-alt.svg";
import ChevronDownIcon from "../../assets/chevron-down-small.svg";
import EyeIcon from "../../assets/eye-small.svg";
import { TableField } from "../TableField";
import { CellValue } from "handsontable/common";

registerAllModules();

const CustomTable: React.FC<CustomTableProps> = ({dataProvider, colHeaders, columns,...props}) =>  {
    const hotRef = useRef<Handsontable | null>(null);
    const {
        handleSave,
        handleDelete,
        COMPONENT_CELL_PER_TYPE,
        headerTable,
    } = useContext(productContext);
    const [currentCell, setCurrentCell] = useState<any>(undefined);
    const [currentRow, setCurrentRow] = useState<number|undefined>(undefined);
    // const [customColumns, setCustomColumns] = useState<ICustomColumns[]>([{}]);
    const [cols, setCols] = useState<ColumnTypes>();

    const customRenderer = (
        instance: Handsontable,
        td: HTMLTableCellElement,
        row: number,
        col: number,
        prop: string,
        value: CellValue,
        cellProperties: Handsontable.CellProperties,
        customComponent: React.ReactElement
    ): void => {
        ReactDOM.render(customComponent, td);
        td.className = "customComponent htMiddle";
    };

    const handleMountColumns: Function = (): void => {
        const columnsCustom: any[] = [];
        headerTable.forEach((column) => {
            if (Object.keys(COMPONENT_CELL_PER_TYPE).includes(column.type?.toString().toUpperCase())) {
                columnsCustom.push({
                    data: column.data,
                    className: column.className,
                    readOnly: true,
                    renderer: (
                        instance: Handsontable,
                        td: HTMLTableCellElement,
                        row: number,
                        col: number,
                        prop: string,
                        value: CellValue,
                        cellProperties: Handsontable.CellProperties
                        ): void => { 
                            // const CustomElement: React.ReactElement<any> = COMPONENT_CELL_PER_TYPE[column.type.toString().toUpperCase()];
                            // const customElementWithProps = React.cloneElement(CustomElement, { value: dataProvider[row]?.[column.data] });
                            const initialValue = typeof dataProvider[row]?.[column.data] !== "object" ? [dataProvider[row]?.[column.data]] : dataProvider[row]?.[column.data];
                            customRenderer(
                                instance,
                                td,
                                row, col, prop, value, cellProperties,
                                <TableField
                                    value={initialValue}
                                    type={column.type}
                                    options={column.options}
                                    handleGetNewValue={(e: string|number) => {
                                        console.log({e})
                                        const value = typeof e === "object"? e : [e];
                                        instance.setDataAtCell(row, col, value)
                                    }}
                                />);
                    },
                    rendererOptions: {column}
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
    }

    useEffect(() => {
        handleMountColumns()
    }, []);

    return (
        <HotTable
            ref={hotRef}
            height="100%"
            colHeaders={colHeaders}
            columns={cols}
            data={dataProvider}
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
            // colWidths="197px"
            rowHeights="52px"
            licenseKey="non-commercial-and-evaluation"
            afterChange={(changes, source) => {
                if (changes?.length && (changes[0][2] !== changes[0][3])) {
                    setCurrentCell(dataProvider[changes[0][0]]);
                    handleSave(dataProvider[changes[0][0]]);
                }
            }}
            afterSelection={(row, column, row2, column2) => {
                setCurrentCell(dataProvider[row])
            }}
            afterSelectionEnd={(row, column, row2, column2) => {
                // if (row !== currentRow && currentCell) {
                //     console.log({currentCell})
                //     setCurrentCell(undefined);
                //     // handleSave(currentCell);
                // }

                // setCurrentRow(row);
            }}
            selectionMode="single"
            afterGetColHeader={(column, TH, headerLevel) => {
                if (TH.querySelector(".componentCustom")) {
                    return;
                }

                const svg = document.createElement("img")
                svg.src = TextAltIcon;

                const eyeIcon = document.createElement("img");
                eyeIcon.src = EyeIcon;

                const chevronIcon = document.createElement("img");
                chevronIcon.src = ChevronDownIcon;

                const content = document.createElement("div")
                content.className = "componentCustom";

                const infos = document.createElement("div") as HTMLElement;
                infos.className = "infos";

                const span: HTMLElement = TH.querySelector(".colHeader") as HTMLElement;
                const label: HTMLElement = document.createElement("label") as HTMLElement;
                label.innerText = span.innerText.charAt(0).toUpperCase() + span.innerText.slice(1);

                infos.append(svg);
                infos.append(label);

                const secondContent = document.createElement("span");
                secondContent.className = "options";
                secondContent.append(eyeIcon, chevronIcon);

                content.append(infos);
                content.append(secondContent);

                const container = TH.querySelector(".relative");
                container.replaceWith(content);
                TH.appendChild(content);
            }}
            beforeOnCellMouseDown={(events, coords, element) => {
                // if (element.getElementsByTagName("div")) {
                //     element.className = "noChange"
                // }
                // console.log(events, coords, element)
            }}
        /> 
    )
};

export default CustomTable;
