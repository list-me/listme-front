type DropdownProps = {
  options: string[];
};

type DropdownState = {
  value: string[];
  dropdownRefs: Array<HTMLDivElement>;
  row: number;
  col: number;
  currentIndex: number;
};

export { DropdownProps, DropdownState };
