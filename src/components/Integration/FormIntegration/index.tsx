import brand from "../../../utils/Integration/Nexaas/brand";
import categories from "../../../utils/Integration/Nexaas/categories";
import products from "../../../utils/Integration/Nexaas/products";
import DefaultForm from "./DefaultForm";

function FormIntegration({
  stepValue,
}: {
  stepValue: string;
}): JSX.Element | null {
  const toDataForm: { [key: string]: any } = {
    BrandConfiguration: brand,
    CategoryConfiguration: categories,
    FeatureConfiguration: null,
    ProductConfiguration: products,
    SKUConfiguration: null,
  };

  const currentDataForm = toDataForm[stepValue];
  if (currentDataForm)
    return (
      <DefaultForm
        leftColumnName="Propriedades de payloads Nexaas"
        centerColumnName="Catálogo ListMe"
        rightColumnName="Campo ListMe"
        dataForm={currentDataForm}
      />
    );
  return null;
}

export default FormIntegration;
