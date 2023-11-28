/* eslint-disable import/prefer-default-export */
import { AxiosResponse } from "axios";
import { api } from "../api";
import { STORAGE } from "../../../constants/localStorage";
import { IConditions } from "../../../context/FilterContext/FilterContextType";

interface IPagination {
  page?: number;
  limit?: number;
  keyword?: string;
}

export const productRequests = {
  list: async (
    { page = 0, limit = 200, keyword }: IPagination,
    templateId?: string,
    conditions?: IConditions[] | undefined,
    operator?: string,
  ): Promise<AxiosResponse> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);

    const requestData = {
      template_id: templateId,
      key: keyword || undefined,
      limit,
      conditions,
      operator,
      offset: page,
    };

    const response = await api.post(`/products/filter`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
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

    return response;
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
  postFromToCSV: async (formData: FormData): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`/products/import/csv`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
