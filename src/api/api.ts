import { getTokenAndUserId } from "@/utils";
import axios, {
  AxiosError,
  AxiosRequestConfig,
} from "axios";

export const api = axios.create({
  baseURL: API_URL,

  timeout: 6000,

  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {

    const { token, userId } = getTokenAndUserId();
    console.log({ userId, token });
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = token;
    config.headers["x-client-id"] = userId;

    return config;
  },

  (err: AxiosError) => Promise.reject(err)
);

api.interceptors.response.use(
  (res) => Promise.resolve(res),

  (error) => {
    return Promise.reject(error);
  }
);

export const getApi = (url = "", params) =>
  api.get(url, { params }).then((res) => res);

export const postApi = (url = "", params, queryParams) =>
  api
    .post(url, params, { params: queryParams })
    .then((res) => res);

export const putApi = (url = "", params) =>
  api.put(url, params).then((res) => res);

export const patchApi = (url = "", params) =>
  api.patch(url, params).then((res) => res);

export const deleteApi = (url = "", params) =>
  api.delete(url, { data: params }).then((res) => res);

export const postApiMultipart = (url = "", formData) =>
  api
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);
