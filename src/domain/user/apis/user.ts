import { api } from "../../common/apis/axios.ts";
import { type BaseUser, type DetailedUser, type Auth } from "../types/user.ts";

interface getOauthCodeParams {
  clientId: string;
  redirectUri: string;
  scope: string[];
  state: string;
}

export type GetTokenResponse = {
  info: BaseUser;
  auth: Auth;
};

export type RefreshTokenResponse = {
  info: BaseUser;
  auth: Auth;
};

// URL 생성 후 소셜 로그인 페이지로 이동
export const getOauthCode = (params: getOauthCodeParams) => {
  const { clientId, redirectUri, scope, state } = params;

  const baseUrl = import.meta.env.VITE_AUTHORIZATION_URL;
  const searchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope.join(" "),
    response_type: "code",
    state: state,
  });

  // 소셜 로그인 페이지로 이동 -> 이후 oauth/callback 으로 리다이렉트
  window.location.href = `${baseUrl}?${searchParams.toString()}`;
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

export const refreshToken = async () => {
  const response = await api.post("/member/refresh");
  console.log("refreshToken response:", response.data); // 디버깅용
  const { token, info } = response.data;
  return {
    info: info,
    auth: {
      accessToken: token,
    },
  };
};
