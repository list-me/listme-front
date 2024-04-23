import { Table } from "antd";
import { ReactElement } from "react";

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
  isPublic?: boolean;
}

interface ICustomColumns {
  [key: string]: string[];
}

type CustomEditors = {
  list: ReactElement;
  radio: ReactElement;
};

interface ICol {
  isCustom: boolean;
  title: string;
  data: string;
  className: string;
  type: string;
  required: boolean;
  options: string[];
  order: string | number;
  hidden: boolean;
  width: string;
  frozen: boolean;
  bucket: string;
  limit: number;
  integrations: {
    provider: string;
    entities: string[];
  }[];
}

export type {
  CustomTableProps,
  ICustomColumns,
  ColumnTypes,
  CustomEditors,
  ICol,
};
