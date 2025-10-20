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

type RawGroupSummary = {
  groupUuid: string;
  groupName: string;
  groupDescription: string;
  joinedAt: string;
};

// 내가 속한 그룹 목록 조회
export const getMyGroups = async (): Promise<GroupSummary[]> => {
  try {
    const response = await api.get("groups/me");
    const groups: RawGroupSummary[] = response.data.groups ?? [];
    return groups.map(
      (g) =>
        ({
          uuid: g.groupUuid,
          name: g.groupName,
          description: g.groupDescription,
          image: undefined, // 서버가 이미지 필드를 주지 않으므로 클라이언트에서 undefined 처리
        }) satisfies GroupSummary,
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

type RawGroupInfo = {
  uuid: string;
  name: string;
  description: string;
  ownerNickname: string;
  memberCount: number;
  image?: string;
};

// 그룹 상세 정보 조회
export const getGroupInfo = async (groupId: string): Promise<GroupInfo> => {
  try {
    const response = await api.get(`/groups/${groupId}`);
    const raw: RawGroupInfo = response.data.group ?? response.data;

    const groupSummary: GroupSummary = {
      uuid: raw.uuid,
      name: raw.name,
      description: raw.description,
      image: raw.image ?? undefined, // 서버가 이미지 미포함 시 undefined
    };

    return {
      groupSummary,
      ownerNickname: raw.ownerNickname,
      memberCount: raw.memberCount,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
