/* eslint-disable */

import axios from "axios";
import { STORAGE } from "../../../constants/localStorage";
import { api } from "../api";
import { toast } from "react-toastify";
import { DEVELOPMENT_ENVIRONMENT } from "../../../constants/environments";

interface SignedUrlResponse {
  url: string;
  access_url: string;
}

type Headers = {
  "Content-Type": string;
  "x-amz-acl"?: string;
};

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
    optionals?: { brand?: string; name?: string },
  ): Promise<SignedUrlResponse> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    let url: string = `template/signed-url?file_type=${fileType}&template_id=${templateId}&file_name=${fileName}`;

    if (optionals?.brand && optionals?.name) {
      url = `template/signed-url?file_type=${fileType}&template_id=${templateId}&file_name=${fileName}&brand=${
        optionals.brand
      }&name=${encodeURIComponent(optionals.name)}`;
    }

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
  uploadFile: async (file: File, url: string): Promise<void> => {
    try {
      const contentType = file.type;
      const headers: Headers = {
        "Content-Type": contentType,
      };

      const currentEnviroment: string | undefined =
        process.env.REACT_APP_ENVIRONMENT;

      if (currentEnviroment === DEVELOPMENT_ENVIRONMENT)
        headers["x-amz-acl"] = "public-read";

      await axios.put(url, file, { headers });
    } catch (error) {
      toast.error("Ocorreu um erro ao realizar o upload de uma das imagens");
    }
  },

  dropFile: async (
    file: string,
    entity: string,
    identifier: string,
    productId: string,
    field: string,
  ): Promise<void> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);

    const data = {
      entity,
      identifier,
      file,
      productId,
      field,
    };

    await api.patch(`file/delete`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
