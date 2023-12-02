import axios, {
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
import { getToken } from "@/utils";
import { ERROR } from "@/constants/messages";

export const api = axios.create({
  baseURL: API_URL,

  timeout: 6000,

  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers[
      "Authorization"
    ] = `Bearer ${getToken()}`;

    return config;
  },

  (err: AxiosError) => Promise.reject(err)
);

api.interceptors.response.use(
  (res) => Promise.resolve(res),

  (error) => {
    const message =
      error?.response?.data.message ||
      error?.response?.data._message;
    console.log(error?.response?.data, message);

    if (ERROR[message]) {
      toast.error(ERROR[error?.response?.data.message], {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
