import { NavigationAction } from "../../CustomTable/Editors/Editors.d";

interface PropsRelation {
  currentValue: Array<any>;
  templateId: string;
  field: string;
  column: any;
  dataProvider: any[];
  row: number;
  isOpen?: boolean;
  onChange: (newValue: Array<T>, action: NavigationAction) => void;
  onCancel: () => void;
}

export type { PropsRelation };
