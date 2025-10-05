import { api } from "@common/apis/axios";
import { AxiosError } from "axios";

// linkStudio는 어떨까?
export const getPluginAuth = async (userCode: string) => {
  try {
    const response = await api.post("/auth/plugin/verify", {
      userCode: userCode,
    });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};
