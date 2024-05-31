import React, { useState } from "react";
import { useFromToContext } from "../../../../../context/FromToContext";
import { StepContentContainer } from "../styles";
import LinkedListSelector from "../../ManageLinkedLists/LinkedListSelector";
import ConfigureLinks from "../../ManageLinkedLists/ConfigureLinks";
import DeleteLinks from "../../ManageLinkedLists/DeleteLinks";
import { useProductContext } from "../../../../../context/products";

function StepManageLinkedLists(): JSX.Element {
  const { currentStep, templates, setTemplates } = useFromToContext();
  const { template: targetTemplate } = useProductContext();
  const [templateSelected, setTemplateSelected] = useState();

  return (
    <StepContentContainer>
      {currentStep === 0 && (
        <LinkedListSelector
          templates={templates}
          setTemplates={setTemplates}
          setTemplateSelected={setTemplateSelected}
        />
      )}
      {currentStep === 1 && (
        <ConfigureLinks
          template={templateSelected}
          targetTemplate={targetTemplate}
        />
      )}
      {currentStep === 2 && <DeleteLinks />}
    </StepContentContainer>
  );
}

export default StepManageLinkedLists;
