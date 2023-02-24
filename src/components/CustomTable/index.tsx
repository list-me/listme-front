import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import React, {useContext, useState} from "react";

import {HotColumn, HotTable} from '@handsontable/react';

import {CustomTableProps} from "./CustomTable.d";
import {productContext} from "../../context/products";
import {isEquivalent} from "../../utils";
import {Cell} from "../Cell";
import TextAltIcon from "../../assets/text-alt.svg";
import ChevronDownIcon from "../../assets/chevron-down-small.svg";
import EyeIcon from "../../assets/eye-small.svg";

registerAllModules();

const CustomTable: React.FC<CustomTableProps> = ({dataProvider, columns, colHeaders, ...props}) => {
    const {handleSave, handleDelete} = useContext(productContext);
    const [currentCell, setCurrentCell] = useState<any>(undefined);
    const [currentRow, setCurrentRow] = useState<number|undefined>(undefined);

    return (
        <HotTable
            height="100%"
            colHeaders={colHeaders}
            columns={columns}
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
            afterSelectionEnd={(row, column, row2, column2) => {
                if (row !== currentRow && currentCell) {
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
            beforeOnCellMouseDown={(event, coords, TD, controller) => {
            }}
        />
    )
}

export default CustomTable;
