export interface IntegrationContextType {
  environment: "PROD" | "HOMOLOG";
  setEnvironment: React.Dispatch<React.SetStateAction<"PROD" | "HOMOLOG">>;
  valueProdApi: string;
  setValueProdApi: React.Dispatch<React.SetStateAction<string>>;
  valueHomologApi: string;
  setValueHomologApi: React.Dispatch<React.SetStateAction<string>>;
}
export type IEnvironment = "PROD" | "HOMOLOG";
