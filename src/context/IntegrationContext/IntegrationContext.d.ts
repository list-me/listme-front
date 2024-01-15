export interface IntegrationContextType {
  environment: "sandbox" | "production";
  setEnvironment: React.Dispatch<
    React.SetStateAction<"sandbox" | "production">
  >;
  valueProdApi: string;
  setValueProdApi: React.Dispatch<React.SetStateAction<string>>;
  valueHomologApi: string;
  setValueHomologApi: React.Dispatch<React.SetStateAction<string>>;
  currentProvider: IProvider;
  setCurrentProvider: React.Dispatch<React.SetStateAction<IProvider>>;
  mode: "editing" | "registration";
  setMode: React.Dispatch<React.SetStateAction<"editing" | "registration">>;
  currentMenus: {
    value: string;
    label: string;
    status: "" | "undone" | "done";
  }[];
  setCurrentMenus: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
        status: "" | "undone" | "done";
      }[]
    >
  >;
}
export type IEnvironment = "sandbox" | "production";
