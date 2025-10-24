import { api } from "@common/apis/axios";
import type { WallInfo } from "../types/wall";
import { AxiosError } from "axios";

// 그룹 내 담벼락 목록 조회
// Backend returns a wrapper with paging. Map to WallInfo[].
type RawWallMessage = {
  groupMemberProfile: {
    uuid: string;
    nickname: string;
    profileImageSrc?: string | null;
    role: string;
  };
  uuid: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export const getGroupWalls = async (groupUuid: string): Promise<WallInfo[]> => {
  try {
    const response = await api.get(`/groups/${groupUuid}/wall/messages`);
    const data = response.data;
    return data.wallMessages.map((m: RawWallMessage) => ({
      uuid: m.uuid,
      author: {
        ...m.groupMemberProfile,
      },
      content: m.content,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    }));
    // return mapped;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

// 담벼락 생성
export const createWall = async ({
  groupUuid,
  content,
}: {
  groupUuid: string;
  content: string;
}) => {
  try {
    const response = await api.post(`/groups/${groupUuid}/wall/messages`, {
      content,
    });
    return 200 <= response.status && response.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

// 담벼락 업데이트
export const updateWall = async ({
  messageUuid,
  content,
}: {
  messageUuid: string;
  content: string;
}) => {
  try {
    const response = await api.patch(`/groups/wall/message/${messageUuid}`, {
      content,
    });
    return 200 <= response.status && response.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

// 담벼락 삭제
export const deleteWall = async (messageId: string) => {
  try {
    const response = await api.delete(`groups/wall/message/${messageId}`);
    return 200 <= response.data.status && response.data.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};
