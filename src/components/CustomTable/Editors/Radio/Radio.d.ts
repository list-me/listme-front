type RadioProps = {
  options: string[];
};

type RadioState = {
  value: string;
  radioRefs: Array<HTMLInputElement>;
  currentIndex: number;
};

export { RadioProps, RadioState };
