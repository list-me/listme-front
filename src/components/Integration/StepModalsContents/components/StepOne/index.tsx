import { useState } from "react";
import DefaultInput from "../../../../DefaultInput";
import { NavigationButton } from "../../../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import Anchor from "../../../../Anchor";

function StepOne(): JSX.Element {
  const [valueProdApi, setValueProdApi] = useState("");
  const [valueHomologApi, setValueHomologApi] = useState("");
  return (
    <>
      <DefaultInput
        label="Chave de API (Produção)"
        type="text"
        value={valueProdApi}
        changeValue={setValueProdApi}
        required
        placeHolder="Insira a chave aqui"
      />
      <DefaultInput
        label="Chave de API (Homologação)"
        type="text"
        value={valueHomologApi}
        changeValue={setValueHomologApi}
        required
        placeHolder="Insira a chave aqui"
      />
      <Anchor link="" text="Como integrar com a Nexass" />
      <NavigationButton>
        <PlusIcon />
        Continuar
      </NavigationButton>
    </>
  );
}

export default StepOne;
