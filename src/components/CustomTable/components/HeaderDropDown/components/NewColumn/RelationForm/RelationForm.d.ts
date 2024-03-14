type RelationOptions = {
  agreementType: string;
  field: string;
  limit: string | number;
  owner: string;
  templateId: string;
};

type Mapping = {
  label: string;
  value: string;
};

type Option = {
  agreementType: string;
  field: string;
  originField: string;
  limit: string | number;
  owner?: string;
  templateId: string;
};

interface IPropsRelationForm {
  value: DataField;
  currentFields?: Array<any>;
  handleChangeOptions: (option: Option) => void;
}

export type { DataField, IPropsRelationForm, Mapping, RelationOptions };
