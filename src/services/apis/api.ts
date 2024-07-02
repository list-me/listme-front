import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { STORAGE } from "../../constants/localStorage";
import { ROUTES } from "../../constants/routes";

const createBaseAPI = (): AxiosInstance => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  return axios.create({ baseURL });
};

export const addHeadersInterceptor = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem(STORAGE.TOKEN) as string;

  return {
    ...config,
    headers: {
      ...(token && { Authorization: `Bearer ${JSON.parse(token)}` }),
      ...(config.headers ? config.headers : {}),
    },
  };
};

const api = createBaseAPI();

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.replace(ROUTES.BASE);
    }
    return Promise.reject(error);
  },
);

export { api };
