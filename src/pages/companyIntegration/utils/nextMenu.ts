interface INextMenu {
  [key: string]: { value: string; label: string } | null;
}

export default {
  product_categories: {
    value: "FeatureConfiguration",
    label: "Config. de Características",
  },
  product_brands: {
    value: "product_categories",
    label: "Config. de Categorias",
  },
  ProductConfiguration: {
    value: "SKUConfiguration",
    label: "Config. de SKU",
  },
  FeatureConfiguration: {
    value: "ProductConfiguration",
    label: "Config. de Produtos",
  },
  SKUConfiguration: null,
} as INextMenu;
