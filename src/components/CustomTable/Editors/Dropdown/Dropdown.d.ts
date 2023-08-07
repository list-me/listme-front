type DropdownProps = {
  options: string[];
};

type DropdownState = {
  value: string[];
  newValue: string;
  radioRefs: Array<HTMLInputElement>;
  row: number;
  col: number;
  currentIndex: number;
};

export { DropdownProps, DropdownState };
