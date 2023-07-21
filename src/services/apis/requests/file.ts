/* eslint-disable */

import axios from "axios";
import { STORAGE } from "../../../constants/localStorage";
import { api } from "../api";
import { toast } from "react-toastify";

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

export const fileRequests = {
  getSignedUrl: async (
    fileName: string,
    fileType: string,
    templateId: string,
  ): Promise<SignedUrlResponse> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);

    const response = await api.get(
      `template/signed-url?fileType=${fileType}&templateId=${templateId}&fileName=${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  },
  uploadFile: async (file: File, url: string): Promise<void> => {
    await axios
      .put(url, file, {
        headers: { "Content-Type": file.type },
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao realizar o upload de uma das imagens");
      });
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
