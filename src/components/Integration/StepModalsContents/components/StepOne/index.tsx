import DefaultInput from "../../../../DefaultInput";
import { NavigationButton } from "../../../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import Anchor from "../../../../Anchor";
import { useIntegration } from "../../../../../context/IntegrationContext";
import { BoxDualSwitch, LabelSwitchBox } from "./styles";
import DualSwitch from "../../../DualSwitch";
import InfoAlert from "../../../../InfoAlert";

function StepOne({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const {
    valueProdApi,
    setValueProdApi,
    valueHomologApi,
    setValueHomologApi,
    environment,
    setEnvironment,
  } = useIntegration();

  const dualOptions = [
    { label: "Homologação", value: "sandbox" },
    { label: "Produção", value: "production" },
  ];
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
      <div>
        <LabelSwitchBox>
          Qual ambiente você deseja integrar?<span>*</span>
          <InfoAlert
            title="Lorem Ipsum"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          />
        </LabelSwitchBox>
        <BoxDualSwitch>
          <DualSwitch
            value={environment}
            options={dualOptions}
            setValue={setEnvironment as any}
          />
        </BoxDualSwitch>
      </div>
      <Anchor link="" text="Como integrar com a Nexaas" />
      <NavigationButton
        onClick={() => setCurrentStep(2)}
        disabled={!(valueProdApi && valueHomologApi)}
      >
        <PlusIcon />
        Continuar
      </NavigationButton>
    </>
  );
}

export default StepOne;
