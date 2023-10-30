import { ReactElement } from "react";

interface IOption {
  label: string;
  icon: ReactElement;
  action?: string;
  type?: string;
}

interface DropdownMenuProps {
  isOpen: boolean;
  icoRef: any;
  openModal: (options: IOption, column: any) => void;
  options: IOption[];
  setIsOpen?: Function;
  col?: any;
}

interface DropdownMenuStyleProps {
  heigth: string;
  width: string;
}

export type { DropdownMenuProps, DropdownMenuStyleProps };
