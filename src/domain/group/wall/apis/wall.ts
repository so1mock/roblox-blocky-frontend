import { api } from "@common/apis/axios";
import type { Wall } from "../types/wall";
import { AxiosError } from "axios";

// 그룹 내 담벼락 목록 조회
export const getGroupWalls = async (groupUuid: string): Promise<Wall[]> => {
  try {
    const response = await api.get(`/groups/${groupUuid}/wall/messages`);
    return response.data.wallMessages;
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
