import { api } from "@common/apis/axios";
import type {
  BoardInfo,
  CreateBoardInfo,
  UpdateBoardInfo,
} from "../types/board";
import { BOARD_ENDPOINT } from "../constants/endpoint";

// 게시글 생성
export const createBoard = async (
  groupUuid: string,
  boardInfo: CreateBoardInfo,
): Promise<boolean> => {
  const response = await api.post(BOARD_ENDPOINT.LIST(groupUuid), boardInfo);
  return 200 <= response.status && response.status < 300;
};

// 그룹 내 게시판 목록 조회
export const getGroupBoards = async (
  groupUuid: string,
  page: number,
  size: number = 10,
) => {
  const response = await api.get(BOARD_ENDPOINT.LIST(groupUuid), {
    params: { page, size },
  });
  return response.data;
};

// 게시글 상세 조회
export const getBoardInfo = async (
  groupUuid: string,
  boardUuid: string,
): Promise<BoardInfo> => {
  const response = await api.get(BOARD_ENDPOINT.DETAIL(groupUuid, boardUuid));
  return response.data;
};

// 게시글 수정
export const updateBoard = async (
  groupUuid: string,
  boardUuid: string,
  boardInfo: UpdateBoardInfo,
) => {
  const response = await api.patch(
    BOARD_ENDPOINT.DETAIL(groupUuid, boardUuid),
    boardInfo,
  );
  return 200 <= response.status && response.status < 300;
};

// 게시글 삭제
export const deleteBoard = async (
  groupUuid: string,
  boardUuid: string,
): Promise<boolean> => {
  const response = await api.delete(
    BOARD_ENDPOINT.DETAIL(groupUuid, boardUuid),
  );
  return 200 <= response.status && response.status < 300;
};
