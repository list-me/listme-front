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
import {ReactComponent as AddColumnIcon} from "../../assets/add-column.svg";
import ChevronDownIcon from "../../assets/chevron-down-small.svg";
import EyeIcon from "../../assets/eye-small.svg";
import { TableField } from "../TableField";
import { CellValue } from "handsontable/common";
import {Cell} from "../Cell/index"
import { DropdownMenu } from "../DropdownMenu";
import { PersonalModal } from "../CustomModa";
import { CellProperties } from "handsontable/settings";
import { hostname } from "os";
import { AddColumn } from "./styles";
import { NewColumn } from "../NewColumn";

registerAllModules();

const CustomTable: React.FC<CustomTableProps> = ({
    dataProvider,
    colHeaders,
    columns
}) =>  {
    const hotRef = useRef<Handsontable | null>(null);
    const {
        handleSave,
        handleDelete,
        handleAdd,
        template,
        COMPONENT_CELL_PER_TYPE,
    } = useContext(productContext);
    const [cols, setCols] = useState<ColumnTypes>();
    const [openModal, setOpenModal] = useState(false);
    const [components, setComponents] = useState<Record<string, React.ReactInstance>>({});

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

    const unmountComponent = (key: string): void => {
        if (components[key]) {
            ReactDOM.unmountComponentAtNode(components[key].parentNode as Element);
            setComponents((prev) => ({...prev, [key]: null}));
        }
    };

    const updateComponent = (td: HTMLTableCellElement, component: React.ReactElement): void => {
        const key = td.dataset.key;

        unmountComponent(key);

        const container = document.createElement("div");
        td.appendChild(container);

        ReactDOM.render(component, container, () => {
            setComponents((prev) => ({ ...prev, [key]: container.firstChild }));
        });
    };

    const handleUnmount = (): void => {
        console.log({components})
        Object.keys(components).forEach((key) => unmountComponent(key));
    };

    useEffect(() => {
        handleMountColumns();

        // return () => handleUnmount();
    }, [dataProvider, hotRef, template]);

    return (
        <>
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
                        handleSave(dataProvider[changes[0][0]]);
                    }
                }}
                viewportColumnRenderingOffset={10}
                // selectionMode="single"
                afterRenderer={(TD, row, col, prop, value, cellProperties) => {
                    if (col+1 === colHeaders.length) { // Verifica se é a coluna 12
                      TD.style.display = 'none'; // Esconde a célula
                    }

                    // if (TD.dataset.key) {
                    //     console.log("entrei")
                    //     updateComponent(TD, (
                    //         <TableField
                    //             value={value}
                    //             type={columns[col]?.type}
                    //             options={columns[col]?.options}
                    //             handleGetNewValue={(e: CellValue, row: number, column: number) => {
                    //                 const cellProperties = hotRef.current?.getCellMeta(row, column);
                    //                 const type = cellProperties?.type;
                    //                 const oldValue = cellProperties?.originalValue;
                    //                 const newValue = type === "numeric" ? parseFloat(e as string) : e;

                    //                 if (newValue !== oldValue) {
                    //                     hotRef.current?.setDataAtCell(row, column, newValue);
                    //                 }
                    //             }}
                    //         />
                    //     ));
                    // }
                }}
                afterGetColHeader={(column: number, TH: HTMLTableHeaderCellElement, headerLevel: number) => {
                    if (TH.querySelector(".customHeader")) {
                        return ;
                    }

                    const test = TH.querySelector(".relative")
                    test.style.display = "none";
                    const thNode = ReactDOM.findDOMNode(TH);
                    const myComponent = document.createElement('div');
                    myComponent.className = "customHeader"

                    const col = template?.fields.fields.find((item) => {
                        if (item.id === columns[column]?.data) {
                            return item
                        }
                    });

                    if (colHeaders[column] === " ") {
                        ReactDOM.render(
                            <NewColumn template={template} />, myComponent);
                    } else {
                        ReactDOM.render(<Cell label={colHeaders[column]} column={col} template={template} />, myComponent);
                    }

                    thNode.appendChild(myComponent);
                    // setIsOpen(!isOpen)
                    
                    // console.log(document.querySelector(".ht__highlight"))
                    // const test = document.querySelector(".ht__highlight");
                    // if (TH.querySelector(".componentCustom")) {
                    //     return;
                    // }

                    // const svg = document.createElement("img")
                    // svg.src = TextAltIcon;

                    // const eyeIcon = document.createElement("img");
                    // eyeIcon.src = EyeIcon;

                    // const chevronIcon = document.createElement("img");
                    // chevronIcon.src = ChevronDownIcon;

                    // const content = document.createElement("div")
                    // content.className = "componentCustom";

                    // const infos = document.createElement("div") as HTMLElement;
                    // infos.className = "infos";

                    // const span: HTMLElement = TH.querySelector(".colHeader") as HTMLElement;
                    // const label: HTMLElement = document.createElement("label") as HTMLElement;
                    // label.innerText = span.innerText.charAt(0).toUpperCase() + span.innerText.slice(1);

                    // infos.append(svg);
                    // infos.append(label);

                    // const secondContent = document.createElement("span");
                    // secondContent.className = "options";
                    // secondContent.append(eyeIcon, chevronIcon);
                    // secondContent.onclick = (e) => {
                    //     console.log(e)
                    //     setIsOpen(!isOpen)
                    // };

                    // content.append(infos);
                    // content.append(secondContent);

                    // const container = TH.querySelector(".relative");
                    // container.replaceWith(content);
                    // TH.appendChild(content);
                }}
                beforeOnCellMouseDown={(events, coords, element) => {
                   
                    // if (element.getElementsByTagName("div")) {
                    //     element.className = "noChange"
                    // }
                    // console.log(events, coords, element)
                }}
                afterOnCellMouseDown={(event, coords, TD) => {
                    // console.log(coords.col)
                }}
            /> 
        </>
    )
};

export default CustomTable;
