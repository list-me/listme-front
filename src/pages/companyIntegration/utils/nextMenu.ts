interface INextMenu {
  [key: string]: { value: string; label: string } | null;
}

export default {
  product_categories: {
    value: "product_features",
    label: "Config. de Características",
  },
  product_brands: {
    value: "product_categories",
    label: "Config. de Categorias",
  },
  products: {
    value: "product_skus",
    label: "Config. de SKU",
  },
  product_features: {
    value: "products",
    label: "Config. de Produtos",
  },
  product_skus: null,
} as INextMenu;
