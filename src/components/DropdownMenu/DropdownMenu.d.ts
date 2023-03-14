interface DropdownMenuProps {
  changeOpen: Function;
  isOpen: boolean;
  icoRef: any;
  openModal: Function;
  options: any[];
  left: any;
  setIsOpen?: Function;
}

interface DropdownMenuStyleProps {
  heigth: string;
  width: string;
}

export type {DropdownMenuProps, DropdownMenuStyleProps};
