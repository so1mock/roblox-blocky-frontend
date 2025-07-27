import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import type { ApiResponse, ApiError } from "../types/api";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    return response;
  },
  (error: AxiosError<ApiResponse<any>>) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.log("400 error", data.message);
          break;
        case 401:
          console.log("401 error", data.message);
          break;
        case 403:
          console.log("403 error", data.message);
          break;
        case 404:
          console.log("404 error", data.message);
          break;
        case 500:
          console.log("500 error", data.message);
          break;
        default:
          console.log("Unknown error", data.message);
      }
    }

    return Promise.reject(error);
  },
);
