interface PropsRelation {
  currentValue: Array<any>;
  templateId: string;
  field: string;
  column: any;
  dataProvider: any[];
  row: number;
  onChange: (newValue: Array<T>) => void;
  onCancel: () => void;
  isOpen?: boolean;
}

export type { PropsRelation };
