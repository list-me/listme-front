import { HotTable } from "@handsontable/react";
import { AlertText, BoxHotTable, ContainerImportConfiguration } from "./styles";
import { useFromToContext } from "../../../../context/FromToContext";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";

function ImportConfiguration(): JSX.Element {
  const { data, setCurrentStep } = useFromToContext();
  return data.length > 0 ? (
    <ContainerImportConfiguration>
      <BoxHotTable>
        <HotTable
          data={data}
          colHeaders={Object.keys(data[0])}
          readOnly
          licenseKey="non-commercial-and-evaluation"
          manualColumnResize
          rowHeights={56}
          viewportColumnRenderingOffset={Object.keys(data[0]).length + 1}
          viewportRowRenderingOffset={11}
          height={435}
          width={958}
          autoColumnSize
        />
      </BoxHotTable>
      <AlertText>
        Mostrando os 10 primeiros itens encontrados neste arquivo
      </AlertText>
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
    </ContainerImportConfiguration>
  ) : (
    <></>
  );
}

export default ImportConfiguration;
