import { useState } from "react";
import StepConfirmation from "./StepConfirmation";
import StepLoading from "./StepLoading";
import StepFinish from "./StepFinish";

function UpdateProducts({
  setIsOpened,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      {currentStep === 0 && (
        <StepConfirmation
          setIsOpened={setIsOpened}
          onClick={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 1 && (
        <StepLoading
          setIsOpened={setIsOpened}
          setNext={() => setCurrentStep(2)}
          onFinish={() => ""}
        />
      )}
      {currentStep === 2 && <StepFinish setIsOpened={setIsOpened} />}
    </>
  );
}

export default UpdateProducts;
