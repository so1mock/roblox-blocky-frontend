import { api } from "@common/apis/axios";
import { AxiosError } from "axios";
import type { GroupMember } from "../types/user";
import { GROUP_USER_ENDPOINT } from "../constants/endpoint";

export const createInviteCode = async (groupUuid: string): Promise<string> => {
  try {
    const response = await api.get(GROUP_USER_ENDPOINT.INVITE(groupUuid));
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
    const response = await api.post(GROUP_USER_ENDPOINT.JOIN, { inviteCode });
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
    const response = await api.get(GROUP_USER_ENDPOINT.MEMBERS(groupUuid));
    return response.data.members;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

export const deleteGroupMember = async (
  groupUuid: string,
  memberUuid: string,
) => {
  try {
    const response = await api.delete(
      GROUP_USER_ENDPOINT.MEMBER(groupUuid, memberUuid),
    );
    return 200 <= response.status && response.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};
