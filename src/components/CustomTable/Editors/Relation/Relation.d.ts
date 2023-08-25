interface PropsRelation {
  currentValue: Array<any>;
  templateId: string;
  field: string;
  column: any;
  dataProvider: any[];
  row: number;
}

type RelationProps = {
  templateId: string;
  column: any;
  dataProvider: any[];
  field: string;
};

type RelationState = {
  value: any;
  newValue: any;
  row: number;
  col: number;
  isOpen: boolean;
};

export type { PropsRelation, RelationProps, RelationState };
