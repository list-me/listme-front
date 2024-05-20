import React from "react";
import { useFromToContext } from "../../../../../context/FromToContext";
import { StepContentContainer } from "../styles";
import LinkedListSelector from "../../ManageLinkedLists/LinkedListSelector";
import ConfigureLinks from "../../ManageLinkedLists/ConfigureLinks";

// import { Container } from './styles';

function StepManageLinkedLists(): JSX.Element {
  const { currentStep } = useFromToContext();

  return (
    <StepContentContainer>
      {currentStep === 0 && <LinkedListSelector />}
      {currentStep === 1 && <ConfigureLinks />}
    </StepContentContainer>
  );
}

export default StepManageLinkedLists;
