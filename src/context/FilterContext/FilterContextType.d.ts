export interface FilterContextType {
  openedFilter: boolean;
  setOpenedFilter: React.Dispatch<React.SetStateAction<boolean>>;
  options: IOption[];
  filters: IFilter[];
  setFilters: React.Dispatch<React.SetStateAction<IFilter[]>>;
  removeFilter: (currentFilters: IFilter[], index: number) => void;
  defaultFilter: IFilter;
  getOptions: (
    currentItem: IFilter,
    index: number,
    key?: string,
    search?: boolean,
  ) => Promise<any>;
  changeValue: (
    e: any,
    index: number,
    typeChange: "column" | "condition" | "value" | "selectValue",
  ) => void;
  optionsToMultiSelect: any;
  conditions: IConditions[];
  setConditions: React.Dispatch<React.SetStateAction<IConditions[]>>;
  setOperator: React.Dispatch<React.SetStateAction<IOperator>>;
  operator: IOperator;
  filterStatus: boolean;
  setFilterStatus: React.Dispatch<React.SetStateAction<boolean>>;
  loadingOptions: boolean;
}

interface ITypes {
  [key: string]: {
    label: string;
    value: string;
    input: "text" | "multi" | "";
  }[];
}

export interface IColumnFilter {
  label: string;
  type: string;
  optionsList: string[];
  // optionsList: string[] | { originField: string; templateId: string }[];
  value: string;
}

export interface IFilter {
  column: IColumnFilter;
  condition: { label: string; value: string; input: "text" | "multi" | "" };
  value?: string;
  selectValue: string[];
  id: number;
}

export interface IFieldsProductFilter {
  id: string;
  title: string;
  value: string[];
}
export type IProductsFilter = {
  createdAt: string;
  id: string;
  isPublic: boolean;
  status: string;
  template_id: string;
  fields: IFieldsProductFilter[];
}[];

export type IConditions =
  | { field: string; action: string; value: string }
  | { field: string; action: string; value: string[] }
  | null;

export interface IOperator {
  label: string;
  value: string;
}

export interface IInputValue {
  value: any;
  index: number;
  typeChange: "value" | "column" | "condition" | "selectValue";
}
