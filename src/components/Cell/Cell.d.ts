import { ReactElement } from "react";

interface ICellProps {
  label: string;
  // icon: ReactElement;
  column: any;
  template: any;
  handleFrozen: Function;
  handleSort: Function;
  handleHidden: Function;
  handleDeleteColumn: () => void;
  freeze: boolean;
  // test: Function;
  // test1: Function;
}

interface IOption {
  label: string;
  icon: ReactElement;
  action: string;
}

export type { ICellProps, IOption };
