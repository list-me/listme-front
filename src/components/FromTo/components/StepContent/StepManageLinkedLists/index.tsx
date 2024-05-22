import React from "react";
import { useFromToContext } from "../../../../../context/FromToContext";
import { StepContentContainer } from "../styles";
import LinkedListSelector from "../../ManageLinkedLists/LinkedListSelector";
import ConfigureLinks from "../../ManageLinkedLists/ConfigureLinks";
import DeleteLinks from "../../ManageLinkedLists/DeleteLinks";

// import { Container } from './styles';

function StepManageLinkedLists(): JSX.Element {
  const { currentStep } = useFromToContext();

  return (
    <StepContentContainer>
      {currentStep === 0 && <LinkedListSelector />}
      {currentStep === 1 && <ConfigureLinks />}
      {currentStep === 2 && <DeleteLinks />}
    </StepContentContainer>
  );
}

export default StepManageLinkedLists;
