import { api } from "@common/apis/axios";
import type { WallInfo } from "../types/wall";
import type { UserRole } from "@user/types/user";
import { AxiosError } from "axios";

// 그룹 내 담벼락 목록 조회
// TEMP: Backend returns a wrapper with paging. Map to WallInfo[] until API aligns.
// After backend update, revert to the simple return (see commented line below).
type RawWallMessage = {
  authorName: string;
  authorUuid: string;
  messageUuid: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
type RawGetGroupWallsResponse = {
  currentPageNumber: number;
  currentPageSize: number;
  possibleNextPageNumbers: number[];
  wallMessages: RawWallMessage[];
};

// 담벼락 목록 조회
export const getGroupWalls = async (groupUuid: string): Promise<WallInfo[]> => {
  try {
    const response = await api.get(`/groups/${groupUuid}/wall/messages`);
    const data: RawGetGroupWallsResponse = response.data;
    const mapped: WallInfo[] = (data.wallMessages ?? []).map((m) => ({
      uuid: m.messageUuid,
      author: {
        uuid: m.authorUuid,
        name: m.authorName,
        role: "LEARNER" as UserRole, // TEMP: backend 미반영. 필요 시 매핑 수정
        profileImageSrc: undefined, // TEMP: backend 미반영
      },
      content: m.content,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    }));
    return mapped;
    // When backend returns WallInfo[] directly:
    // return response.data.wallMessages as WallInfo[];
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
