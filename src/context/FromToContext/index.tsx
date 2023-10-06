import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Papa from "papaparse";

interface IItemValueImportConfiguration {
  value: string;
  label: string;
}

interface IValuesImportConfiguration {
  separator: IItemValueImportConfiguration;
  delimiter: IItemValueImportConfiguration;
  charset: IItemValueImportConfiguration;
  decimal: IItemValueImportConfiguration;
}

interface FromToContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  data: CSVRow[];
  setData: React.Dispatch<React.SetStateAction<CSVRow[]>>;
  fromToIsOpened: boolean;
  setFromToIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  valuesImportConfiguration: IValuesImportConfiguration;
  setValuesImportConfiguration: React.Dispatch<
    React.SetStateAction<IValuesImportConfiguration>
  >;
  parseCSV: (file: File) => void;
  currentFile: File | undefined;
  setCurrentFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

interface CSVRow {
  [key: string]: string;
}

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
  const [valuesImportConfiguration, setValuesImportConfiguration] =
    useState<IValuesImportConfiguration>({
      separator: {
        value: ",",
        label: "Vírgula (,)",
      },
      delimiter: {
        value: '"',
        label: 'Aspas Duplas (")',
      },
      charset: {
        value: "UTF-8",
        label: "UTF-8",
      },
      decimal: {
        value: ".",
        label: "Ponto (.)",
      },
    });

  const parseCSV = useCallback(
    (file: File): void => {
      Papa.parse<CSVRow>(file, {
        header: true,
        delimiter: valuesImportConfiguration.separator.value,
        quoteChar: valuesImportConfiguration.delimiter.value,
        complete: (result) => {
          setData(result.data.slice(0, 10));
        },
      });
    },
    [
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
