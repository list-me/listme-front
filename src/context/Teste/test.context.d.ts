interface IField {
  description: string;
  frozen: boolean;
  group: string;
  help_text: string;
  hidden: boolean;
  id: string;
  is_public: boolean;
  name: string;
  options: string[];
  order: string;
  required: boolean;
  title: string;
  type: string;
  width: string;
}

interface IFields {
  fields: IField[];
  groups: string[];
}

interface ITemplate {
  bucket_url: string;
  company_id: string;
  created_at: string;
  deleted_at: null | string;
  fields: IFields;
  id: string;
  name: string;
  template_id: string;
  updated_at: string;
}

interface IHeader {
  title: string;
  data: string;
  className: string;
  type: string;
  required: boolean;
  options: string[];
  order: string;
  hidden: boolean;
  width: string;
  frozen: boolean;
  bucket_url: string;
}

interface ICustomFields {
  order: string;
  hidden: boolean;
  width: string;
  frozen: boolean;
  id: string;
  data?: any;
}

interface IProductsField {
  id: string;
  title: string;
  value: string[] | string;
}

interface IProducts {
  created_at: string;
  ean: any;
  fields: IProductsField[];
  id: string;
  is_public: boolean;
  product_template_id: string;
  status: string;
}

interface IProductsData {
  limit: number;
  page: number;
  products: IProducts[];
  total: number;
}

interface IBuildProductFields {
  [key: string]: string;
  created_at: string;
  id: string;
}

interface IHandlePost {
  id: string;
  product_template_id: string;
  is_public: boolean;
  fields: { id: string; value: string | string[] }[];
}

export {
  ITemplate,
  IField,
  IFields,
  IHeader,
  ICustomFields,
  IProductsData,
  IProducts,
  IProductsField,
  IBuildProductFields,
  IHandlePost,
};
