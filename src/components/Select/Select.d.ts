type OptionType = {
  value: string | number;
  label: string;
  isDisabled?: boolean;
};

interface ISelect {
  select: ValueType<OptionType, false>;
  onChange: (option: ValueType<OptionType, false>) => void;
  options: OptionsType<OptionType>;
  labelText?: string;
  placeHolder: string;
  small?: boolean;
}

type Styles = {
  control: (provided: CSSProperties) => CSSProperties;
  singleValue: (provided: CSSProperties) => CSSProperties;
  placeholder: (provided: CSSProperties) => CSSProperties;
  menu: (provided: CSSProperties) => CSSProperties;
  option: (provided: CSSProperties, state: OptionState) => CSSProperties;
  indicatorSeparator: () => CSSProperties;
};

type CSSProperties = {
  backgroundColor?: string;
  height?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  cursor?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  width?: string;
  padding?: string;
  display?: string;
  [key: string]: any;
};
