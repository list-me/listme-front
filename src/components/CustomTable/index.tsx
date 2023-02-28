import ReactDOMServer from "react-dom/server";
import React, {useContext, useEffect, useRef, useState} from "react";

import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import {HotTable} from '@handsontable/react';

import {ColumnTypes, CustomTableProps} from "./CustomTable.d";
import {productContext} from "../../context/products";
import TextAltIcon from "../../assets/text-alt.svg";
import ChevronDownIcon from "../../assets/chevron-down-small.svg";
import EyeIcon from "../../assets/eye-small.svg";

registerAllModules();

interface CustomComponentProps {
    data: { value: string };    
}

function CustomComponent(props?: any) {
    return (
    <div className='customComponent'>
        <button>Xirlinha</button>
    </div>
    );
}

const CustomTable: React.FC<CustomTableProps> = ({dataProvider, colHeaders, ...props}) =>  {
    const hotRef = useRef<Handsontable | null>(null);
    const {handleSave, handleDelete, headerTable} = useContext(productContext);
    const [currentCell, setCurrentCell] = useState<any>(undefined);
    const [currentRow, setCurrentRow] = useState<number|undefined>(undefined);
    // const [customColumns, setCustomColumns] = useState<ICustomColumns[]>([{}]);
    const [cols, setCols] = useState<ColumnTypes>();
    
    const customRenderer = (
        instance: Handsontable,
        td: HTMLTableCellElement,
        row: number,
        col: number,
        prop: string | number | undefined,
        value: any,
        cellProperties: Handsontable.CellProperties
    ) => {
        td.innerHTML = ReactDOMServer.renderToString(<CustomComponent />);
        return td;
    }

    const handleMountColumns: Function = (): void => {
        const columns: ColumnTypes = headerTable.map((col) => {
            if (col.type === "file") {
                delete col.type;
                return {
                    data: col.data,
                    className: col.className,
                    renderer: customRenderer
                }
            }

            delete col.type;
            // setCustomColumns((customs) => ([col.type]?.push(col.data), [...customs]));
            return {
                data: col.data,
                className: col.className,
            }
        })

        setCols(columns);
    }

    useEffect(() => {
        handleMountColumns();
    }, [headerTable]);

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
            colWidths="197px"
            rowHeights="52px"
            licenseKey="non-commercial-and-evaluation"
            afterChange={(changes, source) => {
                if (changes?.length && (changes[0][2] !== changes[0][3])) {
                    setCurrentCell(dataProvider[changes[0][0]])
                }
            }}
            afterSelection={(row, column, row2, column2) => {
                setCurrentCell({row, column})
            }}
            afterSelectionEnd={(row, column, row2, column2) => {
                if (row !== currentRow && !currentCell) {
                    setCurrentCell(undefined);
                    handleSave(currentCell);
                }

                setCurrentRow(row);
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
            beforeOnCellMouseDown={() => {
            }}
        />
    )
};

export default CustomTable;
