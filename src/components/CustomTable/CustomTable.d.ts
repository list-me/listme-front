import {Table} from "antd";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface DataType {
    id: string;
    value: string;
}

export interface CustomTableProps {
    dataProvider: DataType[],
    columns: ColumnTypes,
    bordered?: boolean,
};

export type {CustomTableProps};
