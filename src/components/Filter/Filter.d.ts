interface IOption {
  value: string;
  label: string;
  type?: string;
  optionsList?: string[];
  openDropdown?: boolean;
}

export interface IInputValue {
  value: any;
  index: number;
  typeChange: "value" | "column" | "condition" | "selectValue";
}
