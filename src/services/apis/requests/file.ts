import axios from "axios";
import { STORAGE } from "../../../constants/localStorage";
import { api } from "../api";

interface SignedUrlResponse {
  url: string;
  access_url: string;
}

export const fileRequests = {
  getSignedUrl: async (type: string): Promise<SignedUrlResponse> => {
    const token = window.localStorage.getItem(STORAGE.TOKEN);
    const response = await api.get(`/signed-url?fileType=${type}`, {
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
};
