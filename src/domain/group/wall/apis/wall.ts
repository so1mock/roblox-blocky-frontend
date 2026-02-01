import { api } from "@common/apis/axios";
import type { WallInfoPagination } from "../types/wall";
import { AxiosError } from "axios";
import type { UserRole } from "@user/types/user";

// 그룹 내 담벼락 목록 조회
// Backend returns a wrapper with paging. Map to WallInfo[].
type RawWallMessage = {
  groupMemberProfile: {
    uuid: string;
    nickname: string;
    profileImageSrc?: string | null;
    role: UserRole;
  };
  uuid: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export const getGroupWalls = async (
  groupUuid: string,
  page: number,
  size: number = 10,
): Promise<WallInfoPagination> => {
  try {
    const response = await api.get(
      `/groups/${groupUuid}/wall/messages?page=${page}&size=${size}`,
    );
    const data = response.data;
    return {
      ...data,
      wallMessages: data.wallMessages.map((m: RawWallMessage) => ({
        uuid: m.uuid,
        author: {
          ...m.groupMemberProfile,
          profileImageSrc: m.groupMemberProfile.profileImageSrc ?? undefined,
        },
        content: m.content,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
      })),
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
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
      throw e;
    }
    throw e;
  }
};

// 담벼락 업데이트
export const editWall = async ({
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
      throw e;
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
