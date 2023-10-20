import { api } from "../api";
import { STORAGE } from "../../../constants/localStorage";

interface IPagination {
  page?: number;
  limit?: number;
}

// eslint-disable-next-line import/prefer-default-export
export const templateRequests = {
  list: async ({ page = 0, limit = 20 }: IPagination): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(`/templates/?page=${page}&limit=${limit}`, {
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
  post: async (): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(
      `/template`,
      { type: "list" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

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
};
