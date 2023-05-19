interface ITableFieldProps {
  options?: string[];
  value: string[];
  type: string;
  handleSetNewValue?: Function;
  currentItem?: any;

  instance: any;
  row: number;
  col: number;
  prop: string;
  td: any;

  column: any;
}

export type { ITableFieldProps };
