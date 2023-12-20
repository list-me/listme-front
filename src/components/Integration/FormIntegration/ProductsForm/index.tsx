import React, { useState } from "react";
import styled from "styled-components";
import DefaultForm from "../DefaultForm";
import IntegrationNavigate from "../../IntegrationNavigate";
import products from "../../../../utils/Integration/Nexaas/products";
import OptionalItems from "../../OptionalItems";
import { IMenuActivated } from "../../../../pages/companyIntegration/companyIntegration";

const ContainerNavigate = styled.div`
  > div {
    padding: 0;
  }
`;
const ContainerMore = styled.div`
  > div {
    border: none;
  }
`;

function ProductsForm({
  setMenuActivated,
}: {
  setMenuActivated: React.Dispatch<React.SetStateAction<IMenuActivated>>;
}): JSX.Element {
  const [moreActive, setMoreActive] = useState(false);

  return (
    <>
      <DefaultForm
        leftColumnName="Propriedades de payloads Nexaas"
        centerColumnName="Catálogo ListMe"
        rightColumnName="Campo ListMe"
        dataForm={products}
      />
      <OptionalItems setIsActive={setMoreActive} />
      {moreActive && (
        <ContainerMore>
          <DefaultForm
            leftColumnName="Propriedades de payloads Nexaas"
            centerColumnName="Catálogo ListMe"
            rightColumnName="Campo ListMe"
            dataForm={products}
          />
        </ContainerMore>
      )}
      <ContainerNavigate>
        <IntegrationNavigate
          nextMenu={{
            value: "SKUConfiguration",
            label: "Config. de SKU",
          }}
          setNextMenu={setMenuActivated}
        />
      </ContainerNavigate>
    </>
  );
}

export default ProductsForm;
