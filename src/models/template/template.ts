import { TYPE_FIELDS, RelationOption } from "./template.d";

export interface Template {
  id: string;
  name: string;
  type: TYPE_FIELDS;
  title: string;
  options: Array<String | RelationOption>;
  required: boolean;
  helpText: string;
  isPublic: string;
  description: string;
}
