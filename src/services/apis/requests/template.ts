import { api } from "../api";
import { STORAGE } from "../../../constants/localStorage";
import { ITemplate } from "../../../context/products/product.context";

interface IPagination {
  page?: number;
  limit?: number;
  list?: boolean;
  is_public?: boolean;
  sort?: string;
  name?: string;
  category_id?: string;
}

// eslint-disable-next-line import/prefer-default-export
export const templateRequests = {
  list: async ({
    page = 0,
    limit = 20,
    list = false,
  }: IPagination): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(
      `/templates/?offset=${page}&limit=${limit}${list ? "&type=list" : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response?.data?.templates
      ?.sort((lastItem: any, nextItem: any) => {
        if (nextItem.created_at < lastItem.created_at) {
          return 1;
        }

        if (nextItem.created_at > lastItem.created_at) {
          return -1;
        }

        return 0;
      })
      .map((item: any, index: number) => ({ order: index + 1, ...item }));
  },
  // /template/:id/sync

  listSync: async ({ id = "", page = 0, limit = 20 }): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(
      `/template/${id}/sync/?offset=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
  listPublicList: async ({
    page = 0,
    limit = 20,
    is_public = false,
    sort = "",
    name = "",
    category_id = "",
  }: IPagination): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(
      `/templates?offset=${page}&limit=${limit}${
        is_public && `&is_public=true&type=list`
      }${sort && `&sort=${sort}`}${name && `&name=${name}`}${
        category_id && `&category_id=${category_id}`
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      data: response?.data?.templates?.map((item: any, index: number) => ({
        order: index + 1,
        ...item,
      })),
      total: response?.data?.total,
    };
  },
  listDefault: async (): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(`/templates/?default=true`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data?.templates
      ?.sort((lastItem: any, nextItem: any) => {
        if (nextItem.created_at < lastItem.created_at) {
          return 1;
        }

        if (nextItem.created_at > lastItem.created_at) {
          return -1;
        }

        return 0;
      })
      .map((item: any, index: number) => ({ order: index + 1, ...item }));
  },
  get: async (id: string): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(`/template/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  post: async (type: string): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(
      `/template`,
      { type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
  postColumn: async (id: string, body: object): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`/template/${id}/column`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  patchColumn: async (id: string, body: object): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.patch(`/template/${id}/column`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  postDefault: async (type: string, templateId: string): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(
      `/template`,
      { type, defaultTemplateId: templateId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
  postIntegration: async (body: any): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`/template`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  patchIntegration: async (id: string, body: any): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.patch(`/template/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  postFromTo: async (data: ITemplate): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`/template`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  update: async (id: string, template: any): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.patch(`/template/${id}`, template, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data[0];
  },
  customView: async (id: string, fields: any): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`/template/${id}/custom`, fields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data[0];
  },
  removeColumn: async (id: string, column: any): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.delete(`/template/remove/column/${id}`, {
      data: column,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data[0];
  },
  deleteTemplateImport: async (id: string): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.delete(`/template/${id}/import`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data[0];
  },
  deleteTemplateSync: async (id: string): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.delete(`/template/${id}/sync`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data[0];
  },
};
