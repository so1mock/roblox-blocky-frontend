import { type BaseUser, type Auth, type DetailedUser } from "../types/user.ts";
import { api } from "../../common/apis/axios.ts";
import axios from "axios";

export type GetTokenResponse = {
  info: BaseUser;
  auth: Auth;
};

export type RefreshTokenResponse = {
  info: BaseUser;
  auth: Auth;
};

export const getToken = async (code: string): Promise<GetTokenResponse> => {
  const response = await api.post("/oauth2/roblox/callback", { code: code });
  const { token, info } = response.data;
  return {
    info: info,
    auth: {
      accessToken: token,
    },
  };
};

export const getUserInfo = async (): Promise<DetailedUser> => {
  const response = await api.get("/member/me");
  const info: DetailedUser = response.data;
  return info;
};

export const logout = async (): Promise<void> => {
  await api.post("/member/logout");
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
  const response = await refreshApi.post("/member/refresh");
  console.log("refreshToken response:", response.data); // 디버깅용
  const { token, info } = response.data;
  return {
    info: info,
    auth: {
      accessToken: token,
    },
  };
};
