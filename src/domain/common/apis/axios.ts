import axios from "axios";
import { refreshToken } from "@user/apis/user.ts";
import { useAuthStore } from "@user/stores/authStore.ts";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing: boolean = false;
let failedQueue: FailedRequest[] = [];

// // failedQueue 에 있는 요청을 현재 토큰 상태에 따라 처리?
// // 원래는 진작에 reject 했어야 하는 걸 일단은 토큰때문일 수 있으까 잠시 미뤄뒀던 것들
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((request) => {
    if (error || token === null)
      request.reject(error); // 이제 진짜로 reject 처리
    else request.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  // authStore에서 토큰 가져와서 자동으로 헤더에 추가
  const { accessToken } = useAuthStore.getState();
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  console.log(
    "[API Request] ",
    config.method,
    config.url,
    config.headers.Authorization,
  );
  return config;
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401) {
      if (originalRequest._retry) {
        // 이미 리프레시 토큰을 통한 재요청을 시도해본 경우 -> 리프레시 토큰이 만료됐다는 뜻
        // _retry는 원래는 존재하지 않고 우리가 추가한 프로퍼티 이다.
        console.log("리프레시 토큰이 만료되어 메인 페이지로 이동");
        window.location.href = "/";
        return Promise.reject(error);
      }

      // _retry 가 존재하지 않는다면 refresh 토큰을 사용해 새로운 토큰을 발급받는다.
      originalRequest._retry = true;

      // 이미 리프레시 토큰을 통한 재요청이 진행 중이라면 그냥 failedQueue에 추가
      if (isRefreshing) {
        // processQueue가 이미 호출 중인 경우

        // 지연된 요청들은 처음부터 큐에 이런 방식으로 호출된다.
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          // processQueue 에서 매개변수로 쓰는 토큰
          originalRequest.headers["Authorization"] = `Bearer ${token}`; // 이미 요청된 요청이기 때문에 토큰을 직접 수정해 줘야 함
          return api(originalRequest);
        });
      }

      // 리프레시 요청이 진행 중이 아니라면 본격적으로 리프레시 요청 진행
      isRefreshing = true;
      try {
        const response = await refreshToken();
        console.log("토큰 리프레시 성공");
        const newToken = response.auth.accessToken;
        
        // authStore에 새 토큰 저장
        useAuthStore.getState().setToken(newToken);
        
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        // data에서 받아온 데이터로 유저 정보 다시 초기화 시키기
        processQueue(null, newToken); // 전역에 토큰이 있는데 굳이 매개변수로 전달해야 할까에 대한 고민

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        console.log("토큰 리프레시 실패");
        processQueue(error, null);
        useAuthStore.getState().clearAuth(); // 로그인 상태 false로 변경
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
  },
);
