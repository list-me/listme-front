const menus: {
  value: string;
  label: string;
  status: "incomplete" | "done" | "";
}[] = [
  {
    value: "product_brands",
    label: "Config. de Marca",
    status: "done",
  },
  {
    value: "product_categories",
    label: "Config. de Categorias",
    status: "incomplete",
  },
  {
    value: "product_features",
    label: "Config. de Características",
    status: "incomplete",
  },
  {
    value: "ProductConfiguration",
    label: "Config. de Produtos",
    status: "incomplete",
  },
  {
    value: "SKUConfiguration",
    label: "Config. de SKU",
    status: "incomplete",
  },
];

export default menus;
