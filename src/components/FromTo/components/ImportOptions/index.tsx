import React, { useState } from "react";
import { ContainerImportOptions } from "./styles";
import Select from "../../../Select";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import CheckboxCustom from "../../../Checkbox";
import { useFromToContext } from "../../../../context/FromToContext";
import options from "./utils/options";
import handleChangeSelect from "../../utils/handleChangeSelect";

function ImportOptions(): JSX.Element {
  const [checkBox, setCheckBox] = useState("");
  console.log("🚀 ~ file: index.tsx:12 ~ ImportOptions ~ checkBox:", checkBox);

  const { setCurrentStep, valuesImportOptions, setValuesImportOptions } =
    useFromToContext();

  const types = ["import", "starts", "assets"];

  return (
    <ContainerImportOptions>
      {options.map((item) => (
        <Select
          key={item.type}
          select={
            valuesImportOptions[item.type as "status" | "import" | "assets"]
          }
          onChange={(value) =>
            handleChangeSelect(item.type, value, types, setValuesImportOptions)
          }
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
