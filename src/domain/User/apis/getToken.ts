import { api } from "../../common/apis/axios";
import { type BaseUser, type Auth } from "../types.ts";

export type GetTokenResponse = {
  info: BaseUser;
  auth: Auth;
};

export const getToken = async (code: string): Promise<GetTokenResponse> => {
  try {
    const response = await api.post("oauth2/roblox/callback", { code: code });
    const { accessToken, info } = response.data;
    return {
      info: info,
      auth: {
        accessToken: accessToken,
      },
    };
  } catch (error: unknown) {
    throw error;
  }
};
