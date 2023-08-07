import { Table } from "antd";
import { BaseRenderer } from "handsontable/renderers";

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface Values {
  id: string;
  value: string;
}

interface DataType {
  productId: string;
  data: Values[];
}

interface CustomTableProps {
  data?: any[];
  bordered?: boolean;
  rowClassName?: () => string;
  components?: {};
  // colHeaders?: string[];
  setEnable?: () => void;
  addProducts?: () => void;
  children?: any;
}

interface ICustomColumns {
  [key: string]: string[];
}

export type { CustomTableProps, ICustomColumns, ColumnTypes };
