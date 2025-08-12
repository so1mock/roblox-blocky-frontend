import axios from "axios";
import { useAuthStore } from "@user/stores/authStore";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not set. Please check your .env file.");
}

const API_TIMEOUT = 5000;

const instance = axios.create({
  baseURL,
  timeout: API_TIMEOUT,
  withCredentials: true,
});

// 요청 인터셉터 - 모든 요청에 액세스 토큰 추가
instance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 401 에러 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료되었거나 유효하지 않음
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
      // 로그인 페이지로 리다이렉트하거나 토큰 갱신 로직 추가
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
