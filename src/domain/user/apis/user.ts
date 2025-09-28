import { type BaseUser, type Auth, type DetailedUser } from "../types/user.ts";
import { api } from "../../common/apis/axios.ts";
import axios, { AxiosError } from "axios";

export type GetTokenResponse = {
  info: BaseUser;
  auth: Auth;
};

export type RefreshTokenResponse = {
  info: BaseUser;
  auth: Auth;
};

export const getToken = async (code: string): Promise<GetTokenResponse> => {
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

// refreshApi.ts
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
