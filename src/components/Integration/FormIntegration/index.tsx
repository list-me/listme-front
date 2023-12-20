import { IMenuActivated } from "../../../pages/companyIntegration/companyIntegration";
import BrandsForm from "./BrandsForm";
import CategoriesForm from "./CategoriesForm";
import ProductsForm from "./ProductsForm";

function FormIntegration({
  stepValue,
  setMenuActivated,
}: {
  stepValue: string;
  setMenuActivated: React.Dispatch<React.SetStateAction<IMenuActivated>>;
}): JSX.Element | null {
  //   FeatureConfiguration: null,
  //   SKUConfiguration: null,

  if (stepValue === "BrandConfiguration")
    return <BrandsForm setMenuActivated={setMenuActivated} />;
  if (stepValue === "CategoryConfiguration")
    return <CategoriesForm setMenuActivated={setMenuActivated} />;
  if (stepValue === "ProductConfiguration")
    return <ProductsForm setMenuActivated={setMenuActivated} />;
  return null;
}

export default FormIntegration;
