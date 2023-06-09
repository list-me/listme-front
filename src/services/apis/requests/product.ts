import { api } from "../api";
import { STORAGE } from "../../../constants/localStorage";

interface IPagination {
  page?: number;
  limit?: number;
}

export const productRequests = {
  list: async (
    { page = 0, limit = 100 }: IPagination,
    templateId?: string,
  ): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(
      `/products/?offset=${page}&limit=${limit}&product_template_id=${templateId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
  save: async (product: any): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`/product`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  update: async ({ id, fields }: any): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.patch(
      `/product/${id}`,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
  delete: async (id: string): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  get: async (id: any): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};
