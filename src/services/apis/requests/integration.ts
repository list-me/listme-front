import { STORAGE } from "../../../constants/localStorage";
import {
  IMenuInlineActivated,
  IPatchPayloadIntegrationsConfig,
  IPayloadIntegrationsConfig,
} from "../../../models/integration/integration";
import { api } from "../api";

// eslint-disable-next-line import/prefer-default-export
export const integrationsRequest = {
  listConfigTemplates: async (status: IMenuInlineActivated): Promise<any> => {
    const routerConfigtemplates = {
      seeAll: "/integrations/config-templates",
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
  listOfOrganizations: async (apiKey: string): Promise<any> => {
    // const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(
      `https://homologation.oms.nexaas.com/api/v1/organizations`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    return response.data;
  },
  postIntegrationsConfig: async (
    data: IPayloadIntegrationsConfig,
  ): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`integrations/config`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  patchIntegrationsConfig: async (
    id: string,
    data: IPatchPayloadIntegrationsConfig,
  ): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.patch(`integrations/config/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  patchSwitchActivation: async (id: string): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);

    const response = await api.patch(
      `integrations/config/${id}/switch-activation`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
  listConfigTemplatesId: async (id: string): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(`/integrations/config-template/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  listIntegrationsErrors: async ({
    limit,
    offset,
    id,
  }: {
    limit: number;
    offset: number;
    id: string;
  }): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(
      `/integrations/errors?templateId=${id}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
};
