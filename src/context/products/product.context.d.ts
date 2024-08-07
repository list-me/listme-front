interface ICustomCellType {
  [key: string]: string;
}

interface IRelation {
  agreementType: string;
  field: string;
  mappingType: string;
  owner: string;
  templateId: string;
}

interface IHeaderTable {
  title?: string;
  type: string;
  data: string;
  className: string;
  options: string[] | IRelation[];
  hidden?: boolean;
  width?: string;
  frozen?: boolean;
  order?: string;
}

interface IField {
  description: string;
  group: string;
  help_text: string;
  id: string;
  is_public: boolean;
  name: string;
  options: string[];
  required: boolean;
  title: string;
  type: string;
  order?: number;
  hidden?: boolean;
  width?: string;
  frozen?: boolean;
  limit: number;
  integrations: {
    provider: string;
    entities: string[];
  }[];
  enforce_exact_length: boolean;
  default: boolean;
}

interface ITemplate {
  bucket: string;
  company_id: string;
  created_at: string;
  deleted_at: string | null;
  id: string;
  name: string;
  templateId: string;
  updated_at: string | null;
  fields: {
    fields: IField[];
    groups: { label: string; colspan: number; newHiddens: number[] }[];
  };
}

interface IHeader {
  title: string;
  data: string;
  className: string;
  type: string;
  required: boolean;
  options: string[];
  group: string;
  order: string | number;
  hidden: boolean;
  width: string;
  frozen: boolean;
  bucket: string;
  limit: number;
  integrations: {
    provider: string;
    entities: string[];
  }[];
  enforce_exact_length: boolean;
  default: boolean;
}

interface ICustomField {
  enforce_exact_length: any;
  order: string | number;
  hidden: boolean;
  width: string;
  frozen: boolean;
  id: string;
}

interface IProductFields {
  id: string;
  title: string;
  value: string[];
}

interface IProduct {
  created_at: string;
  ean: any;
  id: string;
  is_public: boolean;
  product_template_id: string;
  status: string;
  fields: IProductFields[];
  parent_id: string;
  is_parent: boolean;
  children: any[];
  have_sync: boolean;
}

interface IProductToTable {
  [key: string]: string | string[];
  parent_id: string;
  is_parent: boolean;
  id: string;
  created_at: string;
  childrens?: IProductToTable[];
  have_sync: boolean;
}

interface IProductsRequest {
  limit: number;
  page: number;
  total: NumericDictionary;
  products: IProduct[];
}

export type {
  ICustomCellType,
  IHeaderTable,
  ITemplate,
  IField,
  IHeader,
  ICustomField,
  IProductsRequest,
  IProduct,
  IProductFields,
  IProductToTable,
};
