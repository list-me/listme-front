import { useCallback, useState } from "react";
import StepConfirmation from "./StepConfirmation";
import StepLoading from "./StepLoading";
import StepFinish from "./StepFinish";
import { productRequests } from "../../../../../services/apis/requests/product";

function UpdateProducts({
  setIsOpened,
  ids,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  ids: string[];
}): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);

  const onFinish = useCallback(async () => {
    try {
      const promises = ids.map(async (mItem) => {
        const body = new FormData();
        const emptyCSV = new Blob([""], { type: "text/csv" });
        body.append("items", emptyCSV);
        body.append("is_all", "true");
        body.append("template_id", mItem);
        await productRequests.postLink(body);
      });

      await Promise.all(promises);
      setCurrentStep(2);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [ids]);

  return (
    <>
      {currentStep === 0 && (
        <StepConfirmation
          setIsOpened={setIsOpened}
          onClick={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 1 && (
        <StepLoading setIsOpened={setIsOpened} onFinish={onFinish} />
      )}
      {currentStep === 2 && <StepFinish setIsOpened={setIsOpened} />}
    </>
  );
}

export default UpdateProducts;
