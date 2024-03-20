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
  validateCSV: async (formData: FormData): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`/products/validate/csv`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
  postProductChildren: async (body: {
    product_id: string;
    childs: string[];
  }): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.post(`/product/children`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  deleteProductChildren: async ({
    parent_id,
    childs,
  }: {
    parent_id: string;
    childs: string[];
  }): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { childs },
    };

    const response = await api.delete(`/product/${parent_id}/children`, config);

    return response.data;
  },
  patchProductValue: async ({
    value,
    productId,
    fieldId,
  }: {
    value: string[];
    productId: string;
    fieldId: string;
  }): Promise<any> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.patch(
      `/product/${productId}/field/${fieldId}`,
      {
        value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
};
