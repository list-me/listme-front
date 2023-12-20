import React from "react";
import styled from "styled-components";
import DefaultForm from "../DefaultForm";
import brand from "../../../../utils/Integration/Nexaas/brand";
import IntegrationNavigate from "../../IntegrationNavigate";

const ContainerNavigate = styled.div`
  > div {
    padding: 0;
  }
`;

function BrandsForm(): JSX.Element {
  return (
    <>
      <DefaultForm
        leftColumnName="Propriedades de payloads Nexaas"
        centerColumnName="Catálogo ListMe"
        rightColumnName="Campo ListMe"
        dataForm={brand}
      />
      <ContainerNavigate>
        <IntegrationNavigate />
      </ContainerNavigate>
    </>
  );
}

export default BrandsForm;
