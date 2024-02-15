type FileProps = {
  templateId: string;
  dataProvider: Array<any>;
  changeLoading?: (isLoading: boolean, row?: number, column?: number) => void;
  hotRef: React.RefObject<HotTable>;
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
  companyId: string;
  optionals: { brand: string; name: string };
};

export { FileState, FileProps };
