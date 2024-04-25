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

function StepContent(): JSX.Element {
  const { currentStep, stepType } = useFromToContext();

  return (
    <StepContentContainer>
      {currentStep === 0 && <InitialStep />}
      {currentStep === 1 &&
        (stepType === "fromTo" ? <ImportFile /> : <PublicListList />)}
      {currentStep === 2 && stepType === "fromTo" ? (
        <ImportConfiguration />
      ) : (
        <LinkConfiguration />
      )}
      {currentStep === 3 && stepType === "fromTo" ? <ImportOptions /> : <></>}
      {currentStep === 4 && stepType === "fromTo" ? <LinkFields /> : <></>}
      {currentStep === 4 && stepType !== "fromTo" ? (
        <IntegrationSettings />
      ) : (
        <></>
      )}
      {currentStep === 5 && <LinkFields />}
    </StepContentContainer>
  );
}

export default StepContent;
