interface IConditionFilterComponent {
  item: IFilter;
  index: number;
  filters: IFilter[];
  changeValue: (
    e: any,
    index: number,
    typeChange: "value" | "column" | "condition" | "selectValue",
  ) => void;
  getOptions: (currentItem: IFilter, index: number) => any;
  typesOptions: ITypes;
  options: IOption[];
  optionsToMultiSelect: any;
  removeFilter: (currentFilters: IFilter[], index: number) => void;
  loadingOptions?: boolean;
}
