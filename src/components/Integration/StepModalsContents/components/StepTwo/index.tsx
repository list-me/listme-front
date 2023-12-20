import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButton } from "../../../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import Anchor from "../../../../Anchor";
import SelectComponent from "../../../../Select";
import { BoxDualSwitch, LabelSwitchBox } from "./styles";
import DualSwitch from "../../../DualSwitch";
import { ROUTES } from "../../../../../constants/routes";
import { useIntegration } from "../../../../../context/IntegrationContext";
import InfoAlert from "../../../../InfoAlert";

function StepTwo({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const navigate = useNavigate();
  const { environment, setEnvironment } = useIntegration();

  const dualOptions = [
    { label: "Homologação", value: "HOMOLOG" },
    { label: "Produção", value: "PROD" },
  ];

  const [company, setCompany] = useState("op1");

  return (
    <>
      <SelectComponent
        select={company}
        onChange={setCompany}
        options={[
          { label: "op1", value: "op1" },
          { label: "op2", value: "op2" },
          { label: "op3", value: "op3" },
          { label: "op4", value: "op4" },
        ]}
        placeHolder="Selecione"
        labelText="Empresa"
        required
        infoTitle="Lorem Ipsum"
        infoContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
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
      <div style={{ display: "flex", gap: "16px" }}>
        <NavigationButton prev abort onClick={() => setCurrentStep(1)}>
          <PlusIcon />
          Voltar
        </NavigationButton>
        <NavigationButton onClick={() => navigate(`${ROUTES.INTEGRATION}/oi`)}>
          <PlusIcon />
          Continuar
        </NavigationButton>
      </div>
    </>
  );
}

export default StepTwo;
