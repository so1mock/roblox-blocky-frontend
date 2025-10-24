import { api } from "@common/apis/axios";
import { AxiosError } from "axios";
import type { GroupInfo, GroupSummary } from "../types/group";

export type CreateGroupRequest = {
  name: string;
  description: string;
};

// 그룹 생성
export const createGroup = async (
  groupInfo: CreateGroupRequest,
): Promise<GroupSummary> => {
  try {
    const response = await api.post("/groups", groupInfo);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

// 내가 속한 그룹 목록 조회
export const getMyGroups = async (): Promise<GroupSummary[]> => {
  try {
    const response = await api.get("groups/me");
    return response.data.groups;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

// 그룹 상세 정보 조회
export const getGroupInfo = async (groupId: string): Promise<GroupInfo> => {
  try {
    const response = await api.get(`/groups/${groupId}`);
    return {
      groupSummary: response.data.group,
      ownerNickname: response.data.group.ownerNickname,
      memberCount: response.data.group.memberCount,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
