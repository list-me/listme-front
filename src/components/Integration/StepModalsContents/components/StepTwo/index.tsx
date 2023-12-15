import { useState } from "react";
import { NavigationButton } from "../../../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import Anchor from "../../../../Anchor";
import SelectComponent from "../../../../Select";
import { BoxDualSwitch, LabelSwitchBox } from "./styles";
import DualSwitch from "../../../DualSwitch";

function StepTwo({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
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
      />
      <div>
        <LabelSwitchBox>
          Qual ambiente você deseja integrar?<span>*</span>
        </LabelSwitchBox>
        <BoxDualSwitch>
          <DualSwitch />
        </BoxDualSwitch>
      </div>
      <Anchor link="" text="Como integrar com a Nexass" />
      <div style={{ display: "flex", gap: "16px" }}>
        <NavigationButton prev abort onClick={() => setCurrentStep(1)}>
          <PlusIcon />
          Voltar
        </NavigationButton>
        <NavigationButton>
          <PlusIcon />
          Continuar
        </NavigationButton>
      </div>
    </>
  );
}

export default StepTwo;
