import React, { useState } from "react";
import MyDropzone from "../DropZone";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import { ContainerImportFile } from "./styles";
import { useFromToContext } from "../../../../context/FromToContext";

function ImportFile(): JSX.Element {
  const { setCurrentStep, fileName } = useFromToContext();

  return (
    <ContainerImportFile>
      <MyDropzone />
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
