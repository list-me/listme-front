import React, { useState } from "react";
import { useFromToContext } from "../../../../../context/FromToContext";
import { StepContentContainer } from "../styles";
import LinkedListSelector from "../../ManageLinkedLists/LinkedListSelector";
import ConfigureLinks from "../../ManageLinkedLists/ConfigureLinks";
import DeleteLinks from "../../ManageLinkedLists/DeleteLinks";

function StepManageLinkedLists(): JSX.Element {
  const { currentStep, templates, setTemplates } = useFromToContext();
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
      {currentStep === 1 && <ConfigureLinks template={templateSelected} />}
      {currentStep === 2 && <DeleteLinks />}
    </StepContentContainer>
  );
}

export default StepManageLinkedLists;
