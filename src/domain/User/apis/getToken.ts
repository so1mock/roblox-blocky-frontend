import { api } from "../../common/apis/axios";
import { AxiosError } from "axios";

export type GetTokenResponse = {
  success: boolean;
  data: any | null;
  error: string | null;
};

export const getToken = async (code: string): Promise<GetTokenResponse> => {
  console.log("a code", code);
  try {
    const response = await api.post("oauth2/roblox/callback", { code: code });
    console.log(response);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }
};
