interface ICustomCellType {
  [key: string]: string;
}

interface IHeaderTable {
  title?: string;
  type: string;
  data: string;
  className: string;
  options: string[] | IRelation[];
  hidden?: boolean;
  width?: string;
  frozen?: boolean;
  order?: string;
}

export type { ICustomCellType, IHeaderTable };
