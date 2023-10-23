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
import { useProductContext } from "../products";
import { templateRequests } from "../../services/apis/requests/template";
import { ITemplate } from "../products/product.context";
import { productRequests } from "../../services/apis/requests/product";

const FromToContext = createContext<FromToContextType | undefined>(undefined);

const papaParams: { [key: string]: string } = {
  comma: ",",
  semicolon: ";",
  pipe: "|",
  tab: "\t",
  double_quotes: '"',
  single_quotes: "'",
  dot: ".",
};

export function FromToContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<CSVRow[]>([]);
  const [currentFile, setCurrentFile] = useState<File>();
  const [fromToIsOpened, setFromToIsOpened] = useState<boolean>(false);
  const [selectedLinkFields, setSelectedLinkFields] = useState<{
    [key: string]: IOption;
  }>({});

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
        delimiter: papaParams[valuesImportConfiguration.separator.value],
        quoteChar: papaParams[valuesImportConfiguration.delimiter.value],
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

  const { headerTable, template } = useProductContext();

  function finishFromTo(): void {
    const formData = new FormData();
    formData.append(currentFile?.name || "Generic_Name", currentFile as Blob);

    const targets: { [key: string]: string } = {};

    headerTable.forEach((item) => {
      if (item.title) targets[item.title] = item.data;
    });

    const keys = Object.keys(selectedLinkFields);
    const validKeys = keys.filter((key) => {
      return selectedLinkFields[key].value !== "Ignorar";
    });

    const fieldsToSend = validKeys.map((key) => {
      return {
        origin: key,
        target: targets[selectedLinkFields[key].value],
      };
    });
    const dataFromTo = {
      name: currentFile?.name,
      type: "import",
      fields: {
        fields: fieldsToSend,

        separator: valuesImportConfiguration.separator.value,
        text_delimiter: valuesImportConfiguration.delimiter.value,
        charset: valuesImportConfiguration.charset.value,
        decimal_delimiter: valuesImportConfiguration.decimal.value,
        action: valuesImportOptions.import.value,

        template_id: template.id,
      },
    };
    Promise.all([
      templateRequests.postFromTo(dataFromTo as unknown as ITemplate),
      productRequests.postFromToCSV(formData),
    ]);
  }

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
    finishFromTo,
    selectedLinkFields,
    setSelectedLinkFields,
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
