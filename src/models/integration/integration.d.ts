export interface IConfigCard {
  id: string;
  status: "active" | "inactive";
  provider: string;
  environment: string;
  production_key: string;
  sandbox_key: string;
  custom_configs: { organization_id: string };
}

export interface IDataCard {
  config: IConfigCard;
  description: string;
  id: string;
  name: string;
  provider: string;
  thumbnailUrl: string;
}
export type IDataCardList = IDataCard[];

export interface IMenuToInlineMenu {
  value: string;
  label: string;
  status: "incomplete" | "done" | "";
}
export type IMenuToInlineMenuList = IMenuToInlineMenu[];

export type IMenuInlineActivated = "seeAll" | "active" | "inactive";
