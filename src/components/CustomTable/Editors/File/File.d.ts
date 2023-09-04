type FileProps = {
  templateId: string;
  dataProvider: Array<any>;
  changeLoading?: (isLoading: boolean, row?: number, column?: number) => void;
};

type FileState = {
  value: Array<string>;
  newValue: Array<string>;
  field: string;
  productId: string | undefined;
  col: number;
  row: number;
  isLoading: boolean;
};

export { FileState, FileProps };
