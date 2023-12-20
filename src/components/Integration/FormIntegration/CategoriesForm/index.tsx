import React from "react";
import styled from "styled-components";
import DefaultForm from "../DefaultForm";
import IntegrationNavigate from "../../IntegrationNavigate";
import categories from "../../../../utils/Integration/Nexaas/categories";
import { IMenuActivated } from "../../../../pages/companyIntegration/companyIntegration";

const ContainerNavigate = styled.div`
  > div {
    padding: 0;
  }
`;

function CategoriesForm({
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
        dataForm={categories}
      />
      <ContainerNavigate>
        <IntegrationNavigate
          nextMenu={{
            value: "FeatureConfiguration",
            label: "Config. de Características",
          }}
          setNextMenu={setMenuActivated}
        />
      </ContainerNavigate>
    </>
  );
}

export default CategoriesForm;
