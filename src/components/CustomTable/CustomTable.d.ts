import {Table} from "antd";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface Values {
    id: string;
    value: string;
}

interface DataType {
    productId: string;
    data: Values[];
}

export interface CustomTableProps {
    dataProvider: any[],
    columns: ColumnTypes,
    bordered?: boolean,
    rowClassName?: () => string;
    components?: {};
};

export type {CustomTableProps};
