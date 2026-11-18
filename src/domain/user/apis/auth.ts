import { api } from "@common/apis/axios";
import { AUTH_ENDPOINT } from "../constants/endpoint";

// linkStudio는 어떨까?
export const getPluginAuth = async (userCode: string) => {
  const response = await api.post(AUTH_ENDPOINT.PLUGIN_VERIFY, {
    userCode: userCode,
  });
  return response.data;
};
