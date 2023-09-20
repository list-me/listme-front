import { IHeaderTable } from "../../../../context/products";
import {
  ICustomCellType,
  IProductToTable,
} from "../../../../context/products/product.context";
import { ICol } from "../../CustomTable";

export interface IDefaultTable {
  hotRef: React.RefObject<HotTable>;
  colHeaders: string[];
  setColHeaders: React.Dispatch<React.SetStateAction<string[]>>;
  cols: ICol[];
  products: IProductToTable[];
  setProducts: React.Dispatch<React.SetStateAction<IProductToTable[]>>;
  handleDelete: Function;
  handleSave: (value: any, isNew: boolean, productId: string) => Promise<any>;
  loadingRef: React.RefObject<HTMLDivElement>;
  componentCellPerType: ICustomCellType;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
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
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  headerTable: IHeaderTable[];
  currentKeyword: string;
}
