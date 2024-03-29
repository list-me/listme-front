export interface IntegrationContextType {
  limit: number;
  searchIntegration: string;
  setSearchIntegration: React.Dispatch<React.SetStateAction<string>>;
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
  errors: IErrorsIntegrations;
  setErrors: React.Dispatch<React.SetStateAction<IErrorsIntegrations>>;
  sidebarErrorOpened: boolean;
  setSidebarErrorOpened: React.Dispatch<React.SetStateAction<boolean>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  menuActivated: IMenuInlineActivated;
  setMenuActivated: React.Dispatch<React.SetStateAction<IMenuInlineActivated>>;
  searchSwitch: boolean;
  setSearchSwitch: React.Dispatch<React.SetStateAction<boolean>>;
}
export type IEnvironment = "sandbox" | "production";

export interface IDataErrorIntegrations {
  id: string;
  message: string;
  provider: {
    name: string;
    thumbnailUrl: string;
  };
  product: {
    id: string;
    firstColumnValue: string[];
  };
  createdAt: string;
}

export interface IErrorsIntegrations {
  data: IDataErrorIntegrations[];
  total: number;
  offset: number;
  limit: number;
}
export interface IDataToEdit {
  id: string;
  name: string;
  type: string;
  fields: {
    entity: {
      name: string;
      type: string;
      payloads: {
        multiple: boolean;
        type: string;
        value: {
          fieldId?: string;
          templateId: string;
        };
        templateConfigPayloadId: string;
      }[];
      templateTriggerId: string;
      templateConfigEntityId: string;
    };
    templateConfigId: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  categoryId: string;
  companyId: string;
  templateId: string;
  storage: string;
  integration_config_id: string;
}
