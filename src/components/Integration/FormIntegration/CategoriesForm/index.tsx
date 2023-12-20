import React from "react";
import styled from "styled-components";
import DefaultForm from "../DefaultForm";
import IntegrationNavigate from "../../IntegrationNavigate";
import categories from "../../../../utils/Integration/Nexaas/categories";

const ContainerNavigate = styled.div`
  > div {
    padding: 0;
  }
`;

function CategoriesForm(): JSX.Element {
  return (
    <>
      <DefaultForm
        leftColumnName="Propriedades de payloads Nexaas"
        centerColumnName="Catálogo ListMe"
        rightColumnName="Campo ListMe"
        dataForm={categories}
      />
      <ContainerNavigate>
        <IntegrationNavigate />
      </ContainerNavigate>
    </>
  );
}

export default CategoriesForm;
