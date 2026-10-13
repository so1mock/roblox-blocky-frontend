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

const requestRefresh = async (): Promise<RefreshTokenResponse> => {
  const response = await refreshApi.post(USER_ENDPOINT.REFRESH);
  const { token, info } = response.data;
  return {
    info,
    auth: { accessToken: token },
  };
};

// 진행 중인 갱신 요청. 동시에 여러 곳에서 불러도 실제 요청은 하나만 나간다.
//
// 백엔드는 갱신할 때마다 리프레시 토큰을 회전시키고 옛 토큰을 DB 에서 덮어쓴다.
// 따라서 같은 토큰으로 두 번 갱신하면 늦게 도착한 쪽이 401 을 받고,
// 그 결과 멀쩡히 쓰던 사용자가 로그아웃된다.
// 호출 지점이 둘(라우터 beforeLoad / 401 인터셉터)이라 실제로 겹칠 수 있다.
let inFlight: Promise<RefreshTokenResponse> | null = null;

export const refreshToken = (): Promise<RefreshTokenResponse> => {
  if (!inFlight) {
    inFlight = requestRefresh().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
};
