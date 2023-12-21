import styled from "styled-components";
import { IMenuActivated } from "../../../pages/companyIntegration/companyIntegration";
import brand from "../../../utils/Integration/Nexaas/brand";
import categories from "../../../utils/Integration/Nexaas/categories";
import products from "../../../utils/Integration/Nexaas/products";
import DefaultForm from "./DefaultForm";

const ContainerNavigate = styled.div`
  > div {
    padding: 0;
  }
`;
function FormIntegration({
  menuActivated,
}: {
  menuActivated: IMenuActivated;
}): JSX.Element | null {
  const fieldsForm: {
    [key: string]: {
      key: string;
      catalog: boolean;
      field: boolean;
      required: boolean;
      info: string;
      alert: {
        title: string;
        content: string;
      };
    }[];
  } = {
    CategoryConfiguration: categories as any,
    BrandConfiguration: brand,
    ProductConfiguration: products as any,
    // FeatureConfiguration: null,
    // SKUConfiguration: null,
  };

  const dataForm = fieldsForm[menuActivated];

  return (
    dataForm && (
      <DefaultForm
        leftColumnName="Propriedades de payloads Nexaas"
        centerColumnName="Catálogo ListMe"
        rightColumnName="Campo ListMe"
        dataForm={fieldsForm[menuActivated]}
      />
    )
  );
}

export default FormIntegration;
