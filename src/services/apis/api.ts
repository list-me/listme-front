import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {STORAGE} from "../../constants/localStorage";

const createBaseAPI = (): AxiosInstance => {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    return axios.create({ baseURL });
};

export const addHeadersInterceptor = (
    config: AxiosRequestConfig,
) => {
    const token = localStorage.getItem(STORAGE.TOKEN) as string;

    return {
        ...config,
        headers: {
            ...(token && { Authorization: `Bearer ${JSON.parse(token)}` }),
            ...(config.headers ? config.headers : {}),
        }
    };
};

export const api = createBaseAPI();

