import axios from "axios";
import { STORAGE } from "../../../constants/localStorage";
import { api } from "../api";

interface SignedUrlResponse {
  url: string;
  access_url: string;
}

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const CATEGORY_URL =
  "https://api-dev.collectionplugin.com.br/category/presigned-url";

export const fileRequests = {
  getSignedUrl: async (
    type: string,
    url: string,
  ): Promise<SignedUrlResponse> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);

    if (url === CATEGORY_URL) {
      const response = await axios.post(
        url,
        { filename: generateUUID() },
        {
          headers: {
            "API-Version": "v1",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDgxNjc0Ni1hYjU3LTRjNDgtOTM5ZC0wNmI5ODBmZWRlZjciLCJzZXNzaW9uSWQiOiI5ZDc0ZmRlMS1mMmZhLTRmNGYtYWYzMS02YTEzOWE4MjhiODMiLCJuYW1lIjoiV2FuZGVyc29uIiwiZW1haWwiOiJ3YW5kZXJzb24uanVuaW9hbnR1bmVzQGdtYWlsLmNvbSIsImlhdCI6MTY4NzcxNjAxMiwiZXhwIjoxNjg4MTQ4MDEyfQ.DdMc_Q-Pq1wHXf4xMC6b6JGDXRMOOgWlkSft3bRu_Sk`,
          },
        },
      );

      console.log(response.data);

      const { key, presignedUrl } = response.data;
      return {
        access_url: `https://d1ptd3zs6hice0.cloudfront.net/categories/${key}.png`,
        url: presignedUrl,
      };
    }

    const response = await api.get(`company/signed-url?fileType=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  uploadFile: async (file: File, url: string): Promise<void> => {
    const response = await axios.put(url, file, {
      headers: { "Content-Type": file.type },
    });

    if (response.status !== 200)
      throw "Ocorreu um erro ao realizar o upload de uma das imagens";
  },
  dropFile: async (
    file: string,
    entity: string,
    identifier: string,
    productId: string,
  ): Promise<void> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);

    const data = {
      entity,
      identifier,
      file,
      productId,
    };

    await api.patch(`file/delete`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
