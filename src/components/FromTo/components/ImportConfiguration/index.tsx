import { HotTable } from "@handsontable/react";
import { useEffect, useRef, useState } from "react";
import {
  AlertText,
  BoxHotTable,
  BoxSelects,
  ContainerImportConfiguration,
} from "./styles";
import { useFromToContext } from "../../../../context/FromToContext";
import { BoxButtons, NavigationButton } from "../../../NavigationButton/styles";
import SelectComponent from "../../../Select";
import options from "./utils/options";
import handleChangeSelect from "../../utils/handleChangeSelect";
import { ReactComponent as PlusIcon } from "../../../../assets/plus-fromto.svg";

function ImportConfiguration(): JSX.Element {
  const {
    data,
    setCurrentStep,
    valuesImportConfiguration,
    setValuesImportConfiguration,
    colHeadersToPreviewTable,
  } = useFromToContext();

  const types = [
    "separator",
    "delimiter",
    "charset",
    "decimal",
    "multiOptions",
  ];

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = (): void => {
      const element = document.querySelector(".BoxFromTo");
      if (element) {
        const newHeight = element.clientHeight;
        if (newHeight !== height) {
          setHeight(newHeight);
        }
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [height]);

  return data.length > 0 ? (
    <ContainerImportConfiguration>
      <BoxSelects>
        {options.map((item) => (
          <SelectComponent
            key={item.type}
            select={
              valuesImportConfiguration[
                item.type as
                  | "separator"
                  | "delimiter"
                  | "charset"
                  | "decimal"
                  | "multiOptions"
              ]
            }
            onChange={(value) =>
              handleChangeSelect(
                item.type,
                value,
                types,
                setValuesImportConfiguration,
              )
            }
            options={item.list}
            placeHolder=""
            labelText={item.title}
          />
        ))}
      </BoxSelects>
      <BoxHotTable>
        {data && colHeadersToPreviewTable && (
          <HotTable
            data={data}
            colHeaders={colHeadersToPreviewTable}
            readOnly
            licenseKey="non-commercial-and-evaluation"
            manualColumnResize
            rowHeights={56}
            viewportColumnRenderingOffset={Object.keys(data[0]).length + 1}
            viewportRowRenderingOffset={11}
            height={height - 451}
            width={943}
            autoColumnSize
          />
        )}
      </BoxHotTable>
      <AlertText>
        Mostrando os 10 primeiros itens encontrados neste arquivo
      </AlertText>
      <BoxButtons>
        <NavigationButton
          abort
          prev
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          <PlusIcon />
          Voltar
        </NavigationButton>
        <NavigationButton onClick={() => setCurrentStep((prev) => prev + 1)}>
          <PlusIcon />
          Continuar
        </NavigationButton>
      </BoxButtons>
    </ContainerImportConfiguration>
  ) : (
    <></>
  );
}

export default ImportConfiguration;
