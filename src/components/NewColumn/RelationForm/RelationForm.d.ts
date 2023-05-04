type RelationOptions = {
  agreementType: string;
  field: string;
  mappingType: string;
  owner: string;
  templateId: string;
};

interface DataField {
  description: string;
  frozen?: boolean;
  group: string;
  help_text: string;
  hidden?: boolean;
  id: string;
  is_public: string;
  options: RelationOptions[] | Array<string>;
  order?: string;
  required: boolean;
  title: string;
  type: string;
  width?: string;
}

type Mapping = {
  label: string;
  value: string;
};

interface IPropsRelationForm {
  value: DataField;
  currentFields?: Array<any>;
}

export type { DataField, IPropsRelationForm, Mapping, RelationOptions };
