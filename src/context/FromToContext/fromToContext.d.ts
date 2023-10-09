export interface IItemValueImport {
  value: string;
  label: string;
}

export interface IValuesImportConfiguration {
  separator: IItemValueImport;
  delimiter: IItemValueImport;
  charset: IItemValueImport;
  decimal: IItemValueImport;
}
export interface IValuesImportOptions {
  import: IItemValueImport;
  status: IItemValueImport;
  assets: IItemValueImport;
}

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
}

export interface CSVRow {
  [key: string]: string | number;
}
