import { api } from "@common/apis/axios";

// linkStudio는 어떨까?
export const getPluginAuth = async (userCode: string) => {
  const response = await api.post("/auth/plugin/verify", {
    userCode: userCode,
  });
  return response.data;
};
