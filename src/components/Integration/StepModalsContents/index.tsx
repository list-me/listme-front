import { useState } from "react";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import { ContainerStepModalsContents } from "./styles";

function StepModalsContents(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <ContainerStepModalsContents>
      {currentStep === 1 && <StepOne setCurrentStep={setCurrentStep} />}
      {currentStep === 2 && <StepTwo setCurrentStep={setCurrentStep} />}
    </ContainerStepModalsContents>
  );
}

export default StepModalsContents;
