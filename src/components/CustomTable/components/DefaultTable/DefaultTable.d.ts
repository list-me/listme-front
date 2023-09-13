import { ICustomCellType } from "../../../../context/products/product.context";

export interface IDefaultTable {
  hotRef: React.RefObject<HotTable>;
  headers: string[];
  setHeaders: React.Dispatch<React.SetStateAction<string[]>>;
  cols: any[];
  dataProvider: any[];
  setDataProvider: React.Dispatch<React.SetStateAction<any[]>>;
  handleDelete: Function;
  handleSave: (value: any, isNew: boolean, productId: string) => Promise<any>;
  loadingRef: React.RefObject<HTMLDivElement>;
  componentCellPerType: ICustomCellType;
  total: number;
  handleGetProductsFiltered: (
    key: string,
    templateId: string,
  ) => Promise<any[]>;
  currentKeyword: string;
  template: any;
  renderHeaderComponent: (
    column: number,
    TH: HTMLTableHeaderCellElement,
  ) => void;
  hidden: number[];
  handleResize: Function;
  columns: any[];
  handleMove: Function;
  uploadImages: (files: File[], bucketUrl: string) => Promise<void | string[]>;
}
