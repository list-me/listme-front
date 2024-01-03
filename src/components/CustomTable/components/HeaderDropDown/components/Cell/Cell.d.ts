import { ReactElement } from "react";

interface ICellProps {
  label: string;
  column: any;
  template: any;
  handleFrozen: Function;
  handleSort: Function;
  handleHidden: Function;
  handleDeleteColumn: () => void;
  freeze: boolean;
}

interface IOption {
  label: string;
  icon: ReactElement;
  action: string;
}

enum IconType {
  Text = "text",
  Paragraph = "paragraph",
  Checked = "checked",
  List = "list",
  File = "file",
  Radio = "radio",
  Relation = "relation",
  Numeric = "numeric",
  Decimal = "decimal",
}

export { ICellProps, IOption, IconType };
