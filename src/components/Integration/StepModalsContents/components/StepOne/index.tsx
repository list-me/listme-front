import DefaultInput from "../../../../DefaultInput";
import { NavigationButton } from "../../../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import Anchor from "../../../../Anchor";
import { useIntegration } from "../../../../../context/IntegrationContext";

function StepOne({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const { valueProdApi, setValueProdApi, valueHomologApi, setValueHomologApi } =
    useIntegration();
  return (
    <>
      <DefaultInput
        label="Chave de API (Produção)"
        type="text"
        value={valueProdApi}
        changeValue={setValueProdApi}
        required
        placeHolder="Insira a chave aqui"
        alertTitle="Lorem Ipsum"
        alertContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />
      <DefaultInput
        label="Chave de API (Homologação)"
        type="text"
        value={valueHomologApi}
        changeValue={setValueHomologApi}
        required
        placeHolder="Insira a chave aqui"
        alertTitle="Lorem Ipsum"
        alertContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />
      <Anchor link="" text="Como integrar com a Nexaas" />
      <NavigationButton onClick={() => setCurrentStep(2)}>
        <PlusIcon />
        Continuar
      </NavigationButton>
    </>
  );
}

export default StepOne;
