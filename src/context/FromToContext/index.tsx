import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Papa from "papaparse";
import {
  CSVRow,
  FromToContextType,
  IValuesImportConfiguration,
  IValuesImportOptions,
} from "./fromToContext";
import {
  initialValuesImportConfiguration,
  initialValuesImportOptions,
} from "./InitialValues";

const FromToContext = createContext<FromToContextType | undefined>(undefined);

export function FromToContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<CSVRow[]>([]);
  const [currentFile, setCurrentFile] = useState<File>();
  const [fromToIsOpened, setFromToIsOpened] = useState<boolean>(false);

  const colHeadersToPreviewTable = useMemo((): string[] | null => {
    if (data[0]) return Object.keys(data[0]);
    return null;
  }, [data]);

  const [valuesImportConfiguration, setValuesImportConfiguration] =
    useState<IValuesImportConfiguration>(initialValuesImportConfiguration);
  const [valuesImportOptions, setValuesImportOptions] =
    useState<IValuesImportOptions>(initialValuesImportOptions);

  const parseCSV = useCallback(
    (file: File): void => {
      Papa.parse<CSVRow>(file, {
        header: true,
        delimiter: valuesImportConfiguration.separator.value,
        quoteChar: valuesImportConfiguration.delimiter.value,
        complete: (result) => {
          const decimalChar = valuesImportConfiguration.decimal.value;

          const transformValue = (value: string): string | number => {
            const parsedValue = parseFloat(value.replace(",", "."));

            if (!Number.isNaN(parsedValue)) {
              if (decimalChar === ",") {
                return parsedValue.toString().replace(".", ",");
              }
              return parsedValue;
            }
            return value;
          };

          const transformedData = result.data.map((row) => {
            const newRow = { ...row };
            // eslint-disable-next-line guard-for-in, no-restricted-syntax
            for (const key in newRow) {
              newRow[key] = transformValue(newRow[key].toString());
            }
            return newRow;
          });

          setData(transformedData.slice(0, 10));
        },
      });
    },
    [
      valuesImportConfiguration.decimal.value,
      valuesImportConfiguration.delimiter.value,
      valuesImportConfiguration.separator.value,
    ],
  );

  // ouvintes de alteraçoes pra chamadas
  useEffect(() => {
    if (!fromToIsOpened) {
      setCurrentStep(0);
      setData([]);
      setCurrentFile(undefined);
    }
  }, [fromToIsOpened]);
  useEffect(() => {
    if (currentFile) parseCSV(currentFile);
  }, [currentFile, parseCSV, valuesImportConfiguration]);

  const value = {
    currentStep,
    setCurrentStep,
    data,
    setData,
    fromToIsOpened,
    setFromToIsOpened,
    valuesImportConfiguration,
    setValuesImportConfiguration,
    parseCSV,
    currentFile,
    setCurrentFile,
    colHeadersToPreviewTable,
    valuesImportOptions,
    setValuesImportOptions,
  };

  return (
    <FromToContext.Provider value={value}>{children}</FromToContext.Provider>
  );
}

export const useFromToContext = (): FromToContextType => {
  const context = useContext(FromToContext);
  if (!context) {
    throw new Error(
      "useFromToContext must be used within a FromToContextProvider",
    );
  }
  return context;
};
