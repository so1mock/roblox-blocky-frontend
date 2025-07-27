import { api } from "../../common/apis/axios";

export type GetTokenResponse = {
  success: boolean;
  data: any | null;
  error: string | null;
};

export const getToken = async (code: string) => {
  console.log("a code", code);
  try {
    const response = await api.post("oauth2/roblox/callback", { code: code });
    console.log(response);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error: error.response?.data?.message || "An unknown error occurred",
    };
  }
};
