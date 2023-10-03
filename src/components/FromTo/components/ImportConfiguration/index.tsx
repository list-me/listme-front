import { HotTable } from "@handsontable/react";
import { ContainerImportConfiguration } from "./styles";

interface CSVRow {
  [key: string]: string;
}
function ImportConfiguration({ data }: { data: CSVRow[] }): JSX.Element {
  return data.length > 0 ? (
    <ContainerImportConfiguration>
      <HotTable
        data={data}
        colHeaders={Object.keys(data[0])}
        readOnly
        licenseKey="non-commercial-and-evaluation"
        manualColumnResize
        rowHeights={56}
        colWidths={300}
        viewportColumnRenderingOffset={Object.keys(data[0]).length + 1}
        viewportRowRenderingOffset={11}
        height={435}
        width={958}
      />
    </ContainerImportConfiguration>
  ) : (
    <></>
  );
}

export default ImportConfiguration;
