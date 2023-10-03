import React, { useState } from "react";
import MyDropzone from "../DropZone";
import { NavigationButton } from "../NavigationButton/styles";
import { BoxButtons, ContainerImportFile } from "./styles";

function ImportFile({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const [fileName, setFileName] = useState<string>("");
  return (
    <ContainerImportFile>
      <MyDropzone fileName={fileName} setFileName={setFileName} />
      <BoxButtons>
        <NavigationButton abort>Cancelar</NavigationButton>
        {fileName && (
          <NavigationButton onClick={() => setCurrentStep((prev) => prev + 1)}>
            Continuar
          </NavigationButton>
        )}
      </BoxButtons>
    </ContainerImportFile>
  );
}

export default ImportFile;
