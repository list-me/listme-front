type FieldConfig = {
  max: number;
  default: number;
};

type FieldConfigMap = {
  [key: string]: FieldConfig;
};

const DefaultLimits: FieldConfigMap = {
  text: {
    max: 255,
    default: 150,
  },
  paragraph: {
    max: 550,
    default: 255,
  },
  list: {
    max: 1,
    default: 1,
  },
  radio: {
    max: 1,
    default: 1,
  },
  checked: {
    max: 100,
    default: 50,
  },
  file: {
    max: 20,
    default: 10,
  },
  relation: {
    max: 20,
    default: 10,
  },
  numeric: {
    max: 20,
    default: 10,
  },
  boolean: {
    max: 1,
    default: 1,
  },
  decimal: {
    max: 9,
    default: 6,
  },
};
export default DefaultLimits;
