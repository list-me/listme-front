import React, { useState } from "react";
import MyDropzone from "../DropZone";
import { NavigationButton } from "../NavigationButton/styles";
import { BoxButtons, ContainerImportFile } from "./styles";

interface CSVRow {
  [key: string]: string;
}

function ImportFile({
  setCurrentStep,
  setData,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<CSVRow[]>>;
}): JSX.Element {
  const [fileName, setFileName] = useState<string>("");
  return (
    <ContainerImportFile>
      <MyDropzone
        fileName={fileName}
        setFileName={setFileName}
        setData={setData}
      />
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
