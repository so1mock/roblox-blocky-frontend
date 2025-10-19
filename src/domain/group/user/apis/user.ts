import { api } from "@common/apis/axios";
import { AxiosError } from "axios";

export const createInviteCode = async (groupUuid: string): Promise<string> => {
  try {
    const response = await api.get(`/groups/${groupUuid}/invite`);
    return response.data.inviteCode;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export const joinGroup = async (inviteCode: string) => {
  try {
    const response = await api.post(`/groups/join`, { inviteCode });
    return 200 <= response.status && response.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
  }
};
