import {ColumnType} from "antd/es/table";
import {ReactComponentElement} from "react";
import {SizeType} from "antd/es/config-provider/SizeContext";

interface ITableColumns {
    title: string;
    key: string;
    dataIndex: string;
    sorter?: () => string;
    render?: () => ReactComponentElement<any>;
    align?: string;
}

// export interface ITableProps {
//     columns: ColumnType<ITableColumns>[];
//     dataProvider: any[];
//     size?: SizeType;
// }
