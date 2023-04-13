import { ReactElement } from "react";

interface IOption {
  label: string;
  icon: ReactElement;
  action?: string;
  type?: string;
}

interface DropdownMenuProps {
  changeOpen: Function;
  isOpen: boolean;
  icoRef: any;
  openModal: (options: IOption, column: any) => void;
  options: IOption[];
  left: any;
  setIsOpen?: Function;
  col?: any;
  template?: any;
  frozen?: boolean;
}

interface DropdownMenuStyleProps {
  heigth: string;
  width: string;
}

export type {DropdownMenuProps, DropdownMenuStyleProps};
