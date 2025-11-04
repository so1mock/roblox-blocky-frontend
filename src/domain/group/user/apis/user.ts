import { api } from "@common/apis/axios";
import { AxiosError } from "axios";
import type { GroupMember } from "../types/user";

export const createInviteCode = async (groupUuid: string): Promise<string> => {
  try {
    const response = await api.get(`/groups/${groupUuid}/invite`);
    return response.data.inviteCode;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
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
      throw e;
    }
    throw e;
  }
};

export const getGroupMemberList = async (
  groupUuid: string,
): Promise<GroupMember[]> => {
  try {
    const response = await api.get(`/groups/${groupUuid}/members`);
    return response.data.members;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};
