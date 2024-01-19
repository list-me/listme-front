export interface IConfigCard {
  id: string;
  status: "active" | "inactive";
  provider: string;
  environment: string;
  production_key: string;
  sandbox_key: string;
  custom_configs: { organization_id: string };
}

export interface IProvider {
  config: IConfigCard;
  description: string;
  id: string;
  name: string;
  provider: string;
  thumbnailUrl: string;
}
export type IDataCardList = IProvider[];

export interface IMenuToInlineMenu {
  value: string;
  label: string;
  status: "undone" | "done" | "";
}
export type IMenuToInlineMenuList = IMenuToInlineMenu[];

export type IMenuInlineActivated = "seeAll" | "active" | "inactive";

export interface IPayloadIntegrationsConfig {
  production_key: string;
  sandbox_key: string;
  environment: "production" | "sandbox";
  provider: string;
  custom_configs: {
    organization_id: number;
  };
}
export interface IPatchPayloadIntegrationsConfig {
  production_key: string;
  sandbox_key: string;
  environment: string;
  custom_configs: {
    organization_id: number;
  };
  status: string;
}
