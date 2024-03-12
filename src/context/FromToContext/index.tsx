import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import {
  CSVRow,
  FromToContextType,
  ICSVResponse,
  IValuesImportConfiguration,
  IValuesImportOptions,
  IValuesIntegrationsConfig,
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

  const [csvResponse, setCsvResponse] = useState<ICSVResponse>(
    {} as ICSVResponse,
  );

  const colHeadersToPreviewTable = useMemo((): string[] | null => {
    if (data[0]) return Object.keys(data[0]);
    return null;
  }, [data]);

  const [valuesImportConfiguration, setValuesImportConfiguration] =
    useState<IValuesImportConfiguration>(initialValuesImportConfiguration);

  const [valuesIntegrationsConfig, setValuesIntegrationsConfig] = useState<
    IValuesIntegrationsConfig[]
  >([""]);

  const [valuesImportOptions, setValuesImportOptions] =
    useState<IValuesImportOptions>(initialValuesImportOptions);

  const [providersToIntegration, setProdvidersToIntegration] = useState<
    string[]
  >([]);
  const [allProductsToIntegration, setAllProductsToIntegration] =
    useState<boolean>(true);

  const parseCSV = useCallback(
    (file: File): void => {
      Papa.parse<CSVRow>(file, {
        header: true,
        delimiter: papaParams[valuesImportConfiguration.separator.value],
        quoteChar: papaParams[valuesImportConfiguration.delimiter.value],
        skipEmptyLines: false,
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

  const { template } = useProductContext();

  function finishFromTo(): Promise<any> {
    const keys = Object.keys(selectedLinkFields);
    const validKeys = keys.filter((key) => {
      return selectedLinkFields[key].value !== "Ignorar";
    });

    const fieldsToSend = validKeys.map((key) => {
      return {
        origin: key,
        target: selectedLinkFields[key].value,
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
        status: valuesImportOptions.status.value,
        multioptions: valuesImportConfiguration.multiOptions.value,
        integration: {
          providers: providersToIntegration,
          allProducts: allProductsToIntegration,
        },

        template_id: template.id,
      },
    };
    let templateId = "";
    const result = templateRequests
      .postFromTo(dataFromTo as unknown as ITemplate)
      .then((templateResponse) => {
        templateId = templateResponse.id;

        const formData = new FormData();
        formData.append("file", currentFile as Blob);

        formData.append("templateId", templateId);
        return productRequests.validateCSV(formData);
      })
      .then((productResponse) => {
        const formData = new FormData();
        formData.append("file", currentFile as Blob);
        formData.append("templateId", templateId);
        productRequests.postFromToCSV(formData);
        setCsvResponse(productResponse);
        templateRequests.deleteTemplateImport(templateId);
        return productResponse;
      })
      .catch((error) => {
        if (error.response) {
          const message =
            typeof error.response.data.message === "string"
              ? error.response.data.message
              : error.response.data.message[0];
          toast.error(message);
        } else {
          console.error("Erro na requisição:", error.message);
          toast.error(error.message);
        }
      });
    return result;
  }

  function toClean(): void {
    setCurrentStep(0);
    setData([]);
    setCurrentFile(undefined);
    setCsvResponse({} as ICSVResponse);
    setSelectedLinkFields({});
    setValuesImportConfiguration(initialValuesImportConfiguration);
    setValuesImportOptions(initialValuesImportOptions);
  }

  useEffect(() => {
    if (!fromToIsOpened) {
      toClean();
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
    csvResponse,
    toClean,
    valuesIntegrationsConfig,
    setValuesIntegrationsConfig,
    providersToIntegration,
    setProdvidersToIntegration,
    allProductsToIntegration,
    setAllProductsToIntegration,
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
