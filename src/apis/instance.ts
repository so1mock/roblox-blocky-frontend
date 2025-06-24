import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error("VITE_API_BASE_URL is not set. Please check your .env file.");
}

const API_TIMEOUT = 5000; // 타임아웃을 명확한 상수로 지정

const instance = axios.create({
  baseURL,
  timeout: API_TIMEOUT,
});

// 요청 인터셉터: 인증 토큰 추가
instance.interceptors.request.use(
  (config) => {
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 에러 처리 등
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   // 로그아웃 처리, 토큰 갱신, 경고창 등
    // }
    return Promise.reject(error);
  }
);

export default instance;
