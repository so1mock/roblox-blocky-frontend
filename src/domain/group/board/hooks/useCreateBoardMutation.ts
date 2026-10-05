import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBoardInfo } from "../types/board";
import { createBoard } from "../apis/board";
import { BOARD_QUERY_KEY } from "../constants/queryKey";

export const useCreateBoardMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardInfo: CreateBoardInfo) =>
      createBoard(groupUuid, boardInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOARD_QUERY_KEY.all(groupUuid),
      });
    },
    onError: () => {},
  });
};
