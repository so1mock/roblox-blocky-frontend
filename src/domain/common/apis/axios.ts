import axios, { type InternalAxiosRequestConfig } from "axios";
import { ApiError } from "./ApiError";
import { refreshToken } from "@user/apis/refresh";
import { USER_ENDPOINT } from "@user/constants/endpoint";
import { useAuthStore } from "@user/stores/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 액세스 토큰은 메모리(인스턴스 기본 헤더)에만 둔다.
// null 을 넘기면 헤더를 지운다 — 로그아웃 후에도 옛 토큰이 실려 나가지 않게 한다.
export const setAccessToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// 인증 자체를 수행하는 요청들. 여기서 401 은 "토큰 만료" 가 아니라
// "자격 증명이 틀렸다" 는 뜻이므로 토큰 갱신 흐름을 타면 안 된다.
// (비밀번호 오타에 로그아웃되는 문제를 막는다)
const AUTH_REQUEST_PATHS: string[] = [
  USER_ENDPOINT.LOCAL_LOGIN,
  USER_ENDPOINT.SOCIAL_LOGIN,
  USER_ENDPOINT.LOGOUT,
];

const isAuthRequest = (url?: string) =>
  !!url && AUTH_REQUEST_PATHS.some((path) => url.startsWith(path));

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetriableRequest | undefined;

    // 네트워크 오류·타임아웃이면 response 자체가 없다.
    // 토큰 만료가 아닌 에러는 전부 그대로 호출부로 넘긴다.
    // (여기서 반환값 없이 끝내면 Promise 가 undefined 로 resolve 되어
    //  서버가 보낸 에러 메시지가 통째로 사라진다)
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      isAuthRequest(originalRequest.url)
    ) {
      return Promise.reject(ApiError.from(error));
    }

    if (originalRequest._retry) {
      // 갱신 후 재요청했는데 또 401 -> 리프레시 토큰도 만료됐다
      setAccessToken(null);
      useAuthStore.getState().clearAuth();
      setTimeout(() => window.location.reload(), 0);
      return Promise.reject(ApiError.from(error));
    }
    originalRequest._retry = true;

    try {
      // 동시에 401 이 여러 건 떠도 refreshToken 이 요청을 하나로 합쳐준다.
      // 각 요청은 같은 Promise 를 기다렸다가 새 토큰으로 재시도하면 된다.
      const { auth, info } = await refreshToken();

      setAccessToken(auth.accessToken);
      useAuthStore.getState().setAuth(info);

      originalRequest.headers["Authorization"] = `Bearer ${auth.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      useAuthStore.getState().clearAuth();
      return Promise.reject(ApiError.from(refreshError));
    }
  },
);
