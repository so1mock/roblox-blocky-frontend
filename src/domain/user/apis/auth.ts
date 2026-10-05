import { api } from "@common/apis/axios";
import { AxiosError } from "axios";
import { AUTH_ENDPOINT } from "../constants/endpoint";

// linkStudio는 어떨까?
export const getPluginAuth = async (userCode: string) => {
  try {
    const response = await api.post(AUTH_ENDPOINT.PLUGIN_VERIFY, {
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
