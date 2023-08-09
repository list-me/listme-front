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
  value: string[];
  newValue: string;
  row: number;
  col: number;
};

export type { PropsRelation, RelationProps, RelationState };
