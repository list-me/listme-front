import BrandsForm from "./BrandsForm";
import CategoriesForm from "./CategoriesForm";
import ProductsForm from "./ProductsForm";

function FormIntegration({
  stepValue,
}: {
  stepValue: string;
}): JSX.Element | null {
  //   FeatureConfiguration: null,
  //   SKUConfiguration: null,

  if (stepValue === "BrandConfiguration") return <BrandsForm />;
  if (stepValue === "CategoryConfiguration") return <CategoriesForm />;
  if (stepValue === "ProductConfiguration") return <ProductsForm />;
  return null;
}

export default FormIntegration;
