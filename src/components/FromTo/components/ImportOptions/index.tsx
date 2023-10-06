import React, { useState } from "react";
import { ContainerImportOptions } from "./styles";
import Select from "../../../Select";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import CheckboxCustom from "../../../Checkbox";
import { useFromToContext } from "../../../../context/FromToContext";

function ImportOptions(): JSX.Element {
  const [test, setTest] = useState("");
  const [checkBox, setCheckBox] = useState("");

  const { setCurrentStep } = useFromToContext();

  const options = [
    {
      value: "Adicionar novos e atualizar os existentes",
      label: "Adicionar novos e atualizar os existentes",
    },
    { value: "Apenas adicionar novos", label: "Apenas adicionar novos" },
    {
      value: "Apenas atualizar existentes",
      label: "Apenas atualizar existentes",
    },
  ];

  return (
    <ContainerImportOptions>
      <Select
        select={test}
        onChange={setTest}
        options={options}
        labelText="Importação de produtos"
        placeHolder="Selecione: "
      />
      <Select
        select={test}
        onChange={setTest}
        options={options}
        labelText="Status de novo produto"
        placeHolder="Selecione: "
      />
      <Select
        select={test}
        onChange={setTest}
        options={options}
        labelText="Importar assets"
        placeHolder="Selecione: "
      />
      <CheckboxCustom
        onChange={() => setCheckBox}
        label="Crie uma lista estática de todos os produtos importados"
      />
      <BoxButtons>
        <NavigationButton
          abort
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Voltar
        </NavigationButton>
        <NavigationButton onClick={() => setCurrentStep((prev) => prev + 1)}>
          Continuar
        </NavigationButton>
      </BoxButtons>
    </ContainerImportOptions>
  );
}

export default ImportOptions;
