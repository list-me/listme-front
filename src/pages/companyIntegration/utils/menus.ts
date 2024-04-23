const menus: {
  value: string;
  label: string;
  status: "undone" | "done" | "";
}[] = [
  {
    value: "product_brands",
    label: "Config. de Marca",
    status: "undone",
  },
  {
    value: "product_categories",
    label: "Config. de Categorias",
    status: "undone",
  },
  {
    value: "product_features",
    label: "Config. de Características",
    status: "undone",
  },
  {
    value: "products",
    label: "Config. de Produtos",
    status: "undone",
  },
  {
    value: "product_skus",
    label: "Config. de SKU",
    status: "undone",
  },
];

export default menus;
