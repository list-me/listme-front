interface ITableFieldProps {
  options?: string[];
  value: string[];
  type: string;
  handleSetNewValue?: Function;

  instance: any;
  row: number;
  col: number;
  prop: string;
}

export type { ITableFieldProps };
