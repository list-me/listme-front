type FileProps = {
  templateId: string;
  companyId: string;
  dataProvider: Array<any>;
  changeLoading?: (isLoading: boolean, row?: number, column?: number) => void;
  template: any;
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
