import InitialStep from "../InitialStep";
import ImportFile from "../ImportFile";
import { StepContentContainer } from "./styles";
import ImportConfiguration from "../ImportConfiguration";
import { useFromToContext } from "../../../../context/FromToContext";
import ImportOptions from "../ImportOptions";
import LinkFields from "../LinkFields";
import IntegrationSettings from "../IntegrationSettings";
import PublicListList from "../PublicList/PublicListList";
import LinkConfiguration from "../PublicList/LinkConfiguration";
import LinkFieldsPublic from "../PublicList/LinkFieldsPublic";
import StepContentOutside from "./StepContentOutside";

function StepContent(): JSX.Element {
  const { currentStep, stepType, currentLinkMethodValue } = useFromToContext();
  console.log(
    "🚀 ~ StepContent ~ currentLinkMethodValue:",
    currentLinkMethodValue,
  );
  console.log("🚀 ~ StepContent ~ stepType:", stepType);
  console.log("🚀 ~ StepContent ~ currentStep:", currentStep);

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
  if (stepType === "publicListOutside") return <StepContentOutside />;

  return <></>;
}

export default StepContent;
