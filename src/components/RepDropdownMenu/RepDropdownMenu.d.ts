import { ReactElement } from "react";

interface IStyleProps {
  left: number;
}

interface IDropdownMenuProps extends IStyleProps {
  iconRef: any;
  handleOpen: () => void;
  isOpen: boolean;
  colHeaders: any[];
}

export type { IDropdownMenuProps, IStyleProps };
