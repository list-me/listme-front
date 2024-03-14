import InitialStep from "../InitialStep";
import ImportFile from "../ImportFile";
import { StepContentContainer } from "./styles";
// import LoadingSpinner from "../LoadingSpinner";
import ImportConfiguration from "../ImportConfiguration";
import { useFromToContext } from "../../../../context/FromToContext";
import ImportOptions from "../ImportOptions";
import LinkFields from "../LinkFields";
import IntegrationSettings from "../IntegrationSettings";

function StepContent(): JSX.Element {
  const { currentStep } = useFromToContext();

  return (
    <StepContentContainer>
      {currentStep === 0 && <InitialStep />}
      {currentStep === 1 && <ImportFile />}
      {currentStep === 2 && (
        // <LoadingSpinner
        //   text="Carregando tabela..."
        //   subText="Quase lá... Estamos organizando seus arquivos"
        // />
        <ImportConfiguration />
      )}
      {currentStep === 3 && <ImportOptions />}
      {currentStep === 4 && <IntegrationSettings />}
      {currentStep === 5 && <LinkFields />}
    </StepContentContainer>
  );
}

export default StepContent;
