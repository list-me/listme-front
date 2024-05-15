import { useFromToContext } from "../../../../../context/FromToContext";
import { StepContentContainer } from "../styles";
import InitialStep from "../../InitialStep";
import PublicListList from "../../PublicList/PublicListList";
import LinkMethod from "../../PublicListOutside/LinkMethod";
import LinkConfiguration from "../../PublicList/LinkConfiguration";
import SelectList from "../../PublicListOutside/SelectList";
import LinkFieldsPublic from "../../PublicList/LinkFieldsPublic";

function StepContentOutside(): JSX.Element {
  const { currentStep, currentLinkMethodValue } = useFromToContext();

  if (currentLinkMethodValue === "copy") {
    return (
      <StepContentContainer>
        {currentStep === 0 && <InitialStep />}
        {currentStep === 1 && <PublicListList />}
        {currentStep === 2 && <LinkMethod />}
        {currentStep === 3 && <LinkConfiguration />}
        {currentStep === 4 && <LinkFieldsPublic />}
      </StepContentContainer>
    );
  }

  if (currentLinkMethodValue === "add") {
    return (
      <StepContentContainer>
        {currentStep === 0 && <InitialStep />}
        {currentStep === 1 && <PublicListList />}
        {currentStep === 2 && <LinkMethod />}
        {currentStep === 3 && <SelectList />}
        {currentStep === 4 && <LinkConfiguration />}
        {currentStep === 5 && <LinkFieldsPublic />}
      </StepContentContainer>
    );
  }

  return (
    <StepContentContainer>
      {currentStep === 0 && <InitialStep />}
      {currentStep === 1 && <PublicListList />}
      {currentStep === 2 && <LinkMethod />}
    </StepContentContainer>
  );
}

export default StepContentOutside;
