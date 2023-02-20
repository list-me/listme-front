import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import React, {useContext} from "react";

import { HotTable } from '@handsontable/react';

import {CustomTableProps} from "./CustomTable.d";
import {productContext} from "../../context/products";

registerAllModules();

const CustomTable: React.FC<CustomTableProps> = ({dataProvider, columns, colHeaders, ...props}) => {
    let product: any;
    const {handleSave, handleDelete} = useContext(productContext);

    return (
        <HotTable
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
            }}
            afterMenu
            dragToScroll
            colWidths="197px"
            rowHeights="52px"
            width="100%"
            height="auto"
            preventOverflow="horizontal"
            licenseKey="non-commercial-and-evaluation"
            afterChange={(changes, source) => {
                if (changes?.length) {
                    product = dataProvider[changes[0][0]];
                }
            }}
            afterDocumentKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "ArrowDown") {
                    handleSave(product);
                }
            }}
        />
    )
}

export default CustomTable;
