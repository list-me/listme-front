type RadioProps = {
  options: string[];
};

type RadioState = {
  value: string[];
  newValue: string;
  radioRefs: Array<HTMLInputElement>;
  row: number;
  col: number;
  currentIndex: number;
};

export { RadioProps, RadioState };
