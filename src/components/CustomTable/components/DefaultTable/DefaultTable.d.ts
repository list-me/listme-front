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
  columns: IHeader[];
  setColumns: React.Dispatch<React.SetStateAction<IHeader[]>>;
  handleMove: Function;
  uploadImages: (
    files: File[],
    bucketUrl: string,
    companyId: string,
    optionals?: { brand?: string; name?: string },
  ) => Promise<void | string[]>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  headerTable: IHeaderTable[];
  currentKeyword: string;
  handleNewColumn: Function;
  handleHidden: Function;
  setCurrentCell: React.Dispatch<any>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFreeze: any;
  parentId: string | null;
  setParentId: React.Dispatch<React.SetStateAction<string | null>>;
  subItensMode: "add" | "remove";
  setSubItemsMode: React.Dispatch<React.SetStateAction<"add" | "remove">>;
}
