export interface FilterContextType {
  openedFilter: boolean;
  setOpenedFilter: React.Dispatch<React.SetStateAction<boolean>>;
  options: IOption[];
  filters: IFilter[];
  setFilters: React.Dispatch<React.SetStateAction<IFilter[]>>;
  removeFilter: (currentFilters: IFilter[], index: number) => void;
  defaultFilter: IFilter;
  typesOptions: ITypes;
  getOptions: (currentItem: IFilter) => any;
  changeValue: (
    e: any,
    index: number,
    typeChange: "column" | "condition" | "value" | "selectValue",
  ) => void;
  optionsToSelect: any;
  conditions: IConditions[];
  setOperator: React.Dispatch<React.SetStateAction<IOperator>>;
  operator: IOperator;
}

interface ITypes {
  [key: string]: {
    label: string;
    value: string;
    input: "text" | "multi" | "";
  }[];
}

export interface IFilter {
  column: {
    label: string;
    type: string;
    optionsList: string[];
    // optionsList: string[] | { originField: string; templateId: string }[];
    value: string;
  };
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
