import React from "react";
import styled from "styled-components";
import DefaultForm from "../DefaultForm";
import brand from "../../../../utils/Integration/Nexaas/brand";
import IntegrationNavigate from "../../IntegrationNavigate";
import { IMenuActivated } from "../../../../pages/companyIntegration/companyIntegration";

const ContainerNavigate = styled.div`
  > div {
    padding: 0;
  }
`;

function BrandsForm({
  setMenuActivated,
}: {
  setMenuActivated: React.Dispatch<React.SetStateAction<IMenuActivated>>;
}): JSX.Element {
  return (
    <>
      <DefaultForm
        leftColumnName="Propriedades de payloads Nexaas"
        centerColumnName="Catálogo ListMe"
        rightColumnName="Campo ListMe"
        dataForm={brand}
      />
      <ContainerNavigate>
        <IntegrationNavigate
          nextMenu={{
            value: "CategoryConfiguration",
            label: "Config. de Categorias",
          }}
          setNextMenu={setMenuActivated}
        />
      </ContainerNavigate>
    </>
  );
}

export default BrandsForm;
