export interface IItemValueImport {
  value: string;
  label: string;
}

export interface IValuesImportConfiguration {
  separator: IItemValueImport;
  delimiter: IItemValueImport;
  charset: IItemValueImport;
  decimal: IItemValueImport;
  multiOptions: IItemValueImport;
}
export interface IValuesImportOptions {
  import: IItemValueImport;
  status: IItemValueImport;
  assets: IItemValueImport;
}
export type IValuesIntegrationsConfig =
  | "Nexaas"
  | "NuvemShop"
  | "Shopify"
  | "VTEX"
  | "";

export interface FromToContextType {
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
  colHeadersToPreviewTable: string[] | null;
  valuesImportOptions: IValuesImportOptions;
  setValuesImportOptions: React.Dispatch<
    React.SetStateAction<IValuesImportOptions>
  >;
  finishFromTo: () => Promise<any>;
  selectedLinkFields: {
    [key: string]: IOption;
  };
  setSelectedLinkFields: React.Dispatch<
    React.SetStateAction<{
      [key: string]: IOption;
    }>
  >;
  csvResponse: ICSVResponse;
  toClean: () => void;
  valuesIntegrationsConfig: IValuesIntegrationsConfig[];
  setValuesIntegrationsConfig: React.Dispatch<
    React.SetStateAction<IValuesIntegrationsConfig[]>
  >;
  providersToIntegration: string[];
  setProdvidersToIntegration: React.Dispatch<React.SetStateAction<string[]>>;
  allProductsToIntegration: boolean;
  setAllProductsToIntegration: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CSVRow {
  [key: string]: string | number;
}
export interface ICSVResponse {
  errors: { column: string; total: number; reason: string }[];
  warnings: { column: string; total: number; reason: string }[];
  newFields: [];
  total: number;
}
