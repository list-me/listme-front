import React, { useState } from "react";
import { ContainerImportOptions } from "./styles";
import Select from "../../../Select";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import CheckboxCustom from "../../../Checkbox";
import { useFromToContext } from "../../../../context/FromToContext";
import options from "./utils/options";

function ImportOptions(): JSX.Element {
  const [checkBox, setCheckBox] = useState("");

  const { setCurrentStep, valuesImportOptions, setValuesImportOptions } =
    useFromToContext();

  function handleChange(title: string, value: string): void {
    if (["import", "starts", "assets"].includes(title)) {
      setValuesImportOptions((prev) => ({
        ...prev,
        [title]: value,
      }));
    }
  }

  return (
    <ContainerImportOptions>
      {options.map((item) => (
        <Select
          key={item.type}
          select={
            valuesImportOptions[item.type as "status" | "import" | "assets"]
          }
          onChange={(value) => handleChange(item.type, value)}
          options={item.list}
          placeHolder=""
          labelText={item.title}
        />
      ))}
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
