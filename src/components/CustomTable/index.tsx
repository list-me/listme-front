import React from "react";
import { Table } from "antd";
import {CustomProps} from "./CustomTable.d";

const TableCustom: React.FC<CustomProps> = ({columns, dataProvider}) => {
    return (
        <div>
            <Table
                dataSource={dataProvider}
                columns={columns}
            />
        </div>
    );
};

export default TableCustom;
