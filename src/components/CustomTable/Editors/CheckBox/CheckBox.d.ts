type CheckBoxProps = {
  options: string[];
};

type CheckBoxState = {
  value: string[];
  newValue: string;
  radioRefs: Array<HTMLInputElement>;
  row: number;
  col: number;
  currentIndex: number;
};

export { CheckBoxProps, CheckBoxState };
