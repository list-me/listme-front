enum TYPE_FIELDS {
  RELATION = "relation",
  FILE = "file",
  RADIO = "radio",
  LIST = "list",
  TEXT = "text",
  PARAGRAPH = "paragraph",
  CHECKED = "checked",
}

type RelationOption = {
  field: string;
  limit: number;
  owner: boolean;
  templateId: string;
  originField: string;
  agreementType: "unilateral" | "bilateral";
};

export { TYPE_FIELDS, RelationOption };
