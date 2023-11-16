interface IConditionFilterComponent {
  item: IFilter;
  index: number;
  filters: IFilter[];
  changeValue: (
    value: any,
    index: number,
    typeChange: "value" | "column" | "condition" | "selectValue",
  ) => void;
  options: IOption[];
  optionsToMultiSelect: { value: string; label: string }[][];
  removeFilter: (currentFilters: IFilter[], index: number) => void;
  loadingOptions?: boolean;
}
