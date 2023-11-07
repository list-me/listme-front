export interface FilterContextType {
  openedFilter: boolean;
  setOpenedFilter: React.Dispatch<React.SetStateAction<boolean>>;
  options: IOption[];
  filters: IFilter[];
  setFilters: React.Dispatch<React.SetStateAction<IFilter[]>>;
  removeFilter: (currentFilters: IFilter[], index: number) => void;
  defaultFilter: IFilter;
  typesOptions: ITypes;
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
    value: string;
  };
  condition: { label: string; value: string; input: "text" | "multi" | "" };
  value?: string;
  id: number;
}
