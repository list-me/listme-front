import InitialStep from "../InitialStep";
import ImportFile from "../ImportFile";
import { StepContentContainer } from "./styles";
// import LoadingSpinner from "../LoadingSpinner";
import ImportConfiguration from "../ImportConfiguration";
import { useFromToContext } from "../../../../context/FromToContext";
import ImportOptions from "../ImportOptions";
import LinkFields from "../LinkFields";
import IntegrationSettings from "../IntegrationSettings";
import PublicListList from "../PublicList/PublicListList";
import LinkConfiguration from "../PublicList/LinkConfiguration";
import LinkFieldsPublic from "../PublicList/LinkFieldsPublic";
import LinkMethod from "../PublicListOutside/LinkMethod";
import SelectList from "../PublicListOutside/SelectList";

function StepContent(): JSX.Element {
  const { currentStep, stepType, currentLinkMethodValue } = useFromToContext();

  if (stepType === "fromTo")
    return (
      <StepContentContainer>
        {currentStep === 0 && <InitialStep />}
        {currentStep === 1 && <ImportFile />}
        {currentStep === 2 && <ImportConfiguration />}
        {currentStep === 3 && <ImportOptions />}
        {currentStep === 4 && <LinkFields />}
      </StepContentContainer>
    );
  if (stepType === "publicList")
    return (
      <StepContentContainer>
        {currentStep === 0 && <InitialStep />}
        {currentStep === 1 && <PublicListList />}
        {currentStep === 2 && <LinkConfiguration />}
        {currentStep === 3 && <LinkFieldsPublic />}
        {currentStep === 4 && <IntegrationSettings />}
        {currentStep === 5 && <LinkFields />}
      </StepContentContainer>
    );
  if (stepType === "publicListOutside")
    return (
      <StepContentContainer>
        {currentStep === 0 && <InitialStep />}
        {currentStep === 1 && <PublicListList />}
        {currentStep === 2 && <LinkMethod />}
        {currentStep === 3 &&
          (currentLinkMethodValue === "copy" ? <LinkConfiguration /> : <></>)}
        {currentStep === 3 &&
          (currentLinkMethodValue === "add" ? <SelectList /> : <></>)}
        {currentStep === 4 &&
          (currentLinkMethodValue === "copy" ? <LinkFieldsPublic /> : <></>)}
        {currentStep === 5 && <></>}
      </StepContentContainer>
    );

  return <></>;
}

export default StepContent;
