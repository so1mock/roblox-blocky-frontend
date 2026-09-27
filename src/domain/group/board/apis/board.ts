import { api } from "@common/apis/axios";
import { AxiosError } from "axios";
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
  try {
    const response = await api.post(BOARD_ENDPOINT.LIST(groupUuid), boardInfo);
    return 200 <= response.status && response.status < 300;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

// 그룹 내 게시판 목록 조회
export const getGroupBoards = async (
  groupUuid: string,
  page: number,
  size: number = 10,
) => {
  try {
    const response = await api.get(BOARD_ENDPOINT.LIST(groupUuid), {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

// 게시글 상세 조회
export const getBoardInfo = async (
  groupUuid: string,
  boardUuid: string,
): Promise<BoardInfo> => {
  try {
    const response = await api.get(BOARD_ENDPOINT.DETAIL(groupUuid, boardUuid));
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

// 게시글 수정
export const updateBoard = async (
  groupUuid: string,
  boardUuid: string,
  boardInfo: UpdateBoardInfo,
) => {
  try {
    const response = await api.patch(
      BOARD_ENDPOINT.DETAIL(groupUuid, boardUuid),
      boardInfo,
    );
    return 200 <= response.status && response.status < 300;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

// 게시글 삭제
export const deleteBoard = async (
  groupUuid: string,
  boardUuid: string,
): Promise<boolean> => {
  try {
    const response = await api.delete(
      BOARD_ENDPOINT.DETAIL(groupUuid, boardUuid),
    );
    return 200 <= response.status && response.status < 300;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};
