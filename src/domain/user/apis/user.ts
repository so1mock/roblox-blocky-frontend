import { type BaseUser, type Auth, type DetailedUser } from "../types/user.ts";
import { api } from "../../common/apis/axios.ts";
import axios, { AxiosError } from "axios";

export type LoginResponse = {
  info: BaseUser;
  auth: Auth;
};

export type RefreshTokenResponse = {
  info: BaseUser;
  auth: Auth;
};

// 소셜로그인에서 얻은 코드를 통해서 소셜 로그인 진행
export const socialLogin = async (code: string): Promise<LoginResponse> => {
  try {
    const response = await api.post("/oauth2/roblox/callback", { code: code });
    const { token, info } = response.data;
    return {
      info: info,
      auth: {
        accessToken: token,
      },
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 닉네임, 패스워드를 사용한 일반 로그인
export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("local-auth", {
      username: username,
      password: password,
    });
    const { token, info } = response.data;
    return {
      info: info,
      auth: {
        accessToken: token,
      },
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 사용자 정보 조회
export const getUserInfo = async (): Promise<DetailedUser> => {
  try {
    const response = await api.get("/member/me");
    const info: DetailedUser = response.data;
    return info;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 로그아웃
export const logout = async (): Promise<void> => {
  try {
    await api.post("/member/logout");
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// refreshApi.ts 요청 전용 axios 인스턴스
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 리프레시 요청
export const refreshToken = async () => {
  try {
    const response = await refreshApi.post("/member/refresh");
    const { token, info } = response.data;
    return {
      info: info,
      auth: {
        accessToken: token,
      },
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};
