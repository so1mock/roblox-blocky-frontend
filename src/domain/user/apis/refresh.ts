import axios from "axios";
import { type UserInfo, type Auth } from "../types/user.ts";
import { USER_ENDPOINT } from "../constants/endpoint.ts";

export type RefreshTokenResponse = {
  info: UserInfo;
  auth: Auth;
};

// 공용 api 인스턴스와 분리된 전용 인스턴스.
// 401 인터셉터가 붙어 있지 않아 갱신 실패가 또 갱신을 부르는 무한 루프가 생기지 않는다.
// 또한 common/apis/axios 를 import 하지 않으므로 둘 사이에 순환 의존이 생기지 않는다.
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await refreshApi.post(USER_ENDPOINT.REFRESH);
  const { token, info } = response.data;
  return {
    info,
    auth: { accessToken: token },
  };
};
