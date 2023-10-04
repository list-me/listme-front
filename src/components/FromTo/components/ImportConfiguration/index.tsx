import { HotTable } from "@handsontable/react";
import { ContainerImportConfiguration } from "./styles";
import { useFromToContext } from "../../../../context/FromToContext";

function ImportConfiguration(): JSX.Element {
  const { data } = useFromToContext();
  return data.length > 0 ? (
    <ContainerImportConfiguration>
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
    </ContainerImportConfiguration>
  ) : (
    <></>
  );
}

export default ImportConfiguration;
