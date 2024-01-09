import { STORAGE } from "../../../constants/localStorage";
import { IMenuInlineActivated } from "../../../models/integration/integration";
import { api } from "../api";

// eslint-disable-next-line import/prefer-default-export
export const integrationsRequest = {
  listConfigTemplates: async (status: IMenuInlineActivated): Promise<any> => {
    const routerConfigtemplates = {
      seeAll: "/inte/grations/config-templates",
      active: "/integrations/config-templates?status=active",
      inactive: "/integrations/config-templates?status=inactive",
    };

    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(routerConfigtemplates[status], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};
