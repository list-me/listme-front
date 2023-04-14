interface IInputProps {
  label?: string;
  name: string;
  type: string;
  value?: string;
  autoFocus?: boolean;
  height?: string | number;
  width?: string | number;
  bordered?: boolean;
  handleCustomChange?: (value: string) => void;
  placeholder?: string;
  background?: boolean;
  validation?: {
    matchWord?: string;
  };
  padding?: string;
}

export type { IInputProps };
