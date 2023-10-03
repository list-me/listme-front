import InitialStep from "../InitialStep";
import ImportFile from "../ImportFile";
import { StepContentContainer } from "./styles";
import LoadingSpinner from "../LoadingSpinner";
import ImportConfiguration from "../ImportConfiguration";
import { useFromToContext } from "../../../../context/FromToContext";

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
    </StepContentContainer>
  );
}

export default StepContent;
