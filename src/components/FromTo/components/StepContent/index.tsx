import React, { useState } from "react";
import InitialStep from "../InitialStep";
import ImportFile from "../ImportFile";
import { StepContentContainer } from "./styles";
import LoadingSpinner from "../LoadingSpinner";
import ImportConfiguration from "../ImportConfiguration";

interface CSVRow {
  [key: string]: string;
}

function StepContent({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const [data, setData] = useState<CSVRow[]>([]);
  return (
    <StepContentContainer>
      {currentStep === 0 && <InitialStep setCurrentStep={setCurrentStep} />}
      {currentStep === 1 && (
        <ImportFile setCurrentStep={setCurrentStep} setData={setData} />
      )}
      {currentStep === 2 && (
        // <LoadingSpinner
        //   text="Carregando tabela..."
        //   subText="Quase lá... Estamos organizando seus arquivos"
        // />
        <ImportConfiguration data={data} />
      )}
    </StepContentContainer>
  );
}

export default StepContent;
