import React from "react";
import InitialStep from "../InitialStep";
import ImportFile from "../ImportFile";
import { StepContentContainer } from "./styles";
import LoadingSpinner from "../LoadingSpinner";

// import { Container } from './styles';

function StepContent({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  return (
    <StepContentContainer>
      {currentStep === 0 && <InitialStep setCurrentStep={setCurrentStep} />}
      {currentStep === 1 && <ImportFile setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && (
        <LoadingSpinner
          text="Carregando tabela..."
          subText="Quase lá... Estamos organizando seus arquivos"
        />
      )}
    </StepContentContainer>
  );
}

export default StepContent;
