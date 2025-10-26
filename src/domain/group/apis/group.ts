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
      throw e;
    }
    throw e;
  }
};

// 그룹 삭제
export const deleteGroup = async (uuid: string) => {
  try {
    const response = await api.delete(`groups/${uuid}`);
    return 200 <= response.data.status && response.data.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
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
      throw e;
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
      ownerNickname: response.data.ownerNickname,
      memberCount: response.data.memberCount,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 그룹 정보 수정(반 이름, 반 설명))
export const updateGroupInfo = async (editedGroupInformation: GroupSummary) => {
  try {
    const response = await api.put(`groups/${editedGroupInformation.uuid}`, {
      name: editedGroupInformation.name,
      description: editedGroupInformation.description,
    });
    return 200 <= response.data.status && response.data.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 그룹 아이콘 수정
