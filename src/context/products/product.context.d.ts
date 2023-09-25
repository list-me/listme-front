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
}

interface ITemplate {
  bucket_url: string;
  company_id: string;
  created_at: string;
  deleted_at: string | null;
  id: string;
  name: string;
  templateId: string;
  updated_at: string | null;
  fields: { fields: IField[]; groups: string[] };
}

interface IHeader {
  title: string;
  data: string;
  className: string;
  type: string;
  required: boolean;
  options: string[];
  order: string | number;
  hidden: boolean;
  width: string;
  frozen: boolean;
  bucket_url: string;
}

interface ICustomField {
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
}

interface IProductToTable {
  [key: string]: string | string[];
  id: string;
  created_at: string;
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
