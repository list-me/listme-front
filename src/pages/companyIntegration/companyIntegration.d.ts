export type IMenuActivated =
  | "product_categories"
  | "BrandConfiguration"
  | "ProductConfiguration"
  | "FeatureConfiguration"
  | "SKUConfiguration";

export type IFieldsByID = {
  id: "string";
  name: "string";
  payload: {
    id: "string";
    key: "string";
    cast: "string";
    types: string["string"];
    required: boolean;
  }[];
  endpointPath: "string";
};

export interface ITemplatesById {
  id: "string";
  name: "string";
  payloads: {
    fields: IFieldsByID[];
    provider: "string";
    description: "string";
    thumbnailUrl: "string";
  };
}
