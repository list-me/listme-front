import {Table} from "antd";

import React from "react";
import {CustomTableProps} from "./CustomTable.d";

const CustomTable: React.FC<CustomTableProps> = ({dataProvider, columns, ...props}) => {
    return (
        <Table
            columns={columns}
            dataSource={dataProvider}
            // scroll={{x: "max-content"}}
            pagination={false}
            {...props}

        />
    )
}

export default CustomTable;
