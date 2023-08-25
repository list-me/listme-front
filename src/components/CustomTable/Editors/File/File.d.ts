type FileProps = {
  templateId: string;
  dataProvider: Array<any>;
};

type FileState = {
  value: Array<string>;
  newValue: Array<string>;
  field: string;
  productId: string | undefined;
  col: number;
  row: number;
};

export { FileState, FileProps };
