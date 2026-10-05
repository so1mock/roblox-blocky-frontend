import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../apis/board";
import { BOARD_QUERY_KEY } from "../constants/queryKey";
import type { UpdateBoardInfo } from "../types/board";

export const useUpdateBoardMutation = (
  groupUuid: string,
  boardUuid: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardInfo: UpdateBoardInfo) =>
      updateBoard(groupUuid, boardUuid, boardInfo),
    onSuccess: () => {
      // 목록과 상세를 함께 무효화한다 (boards 접두사가 둘 다 덮는다)
      queryClient.invalidateQueries({
        queryKey: BOARD_QUERY_KEY.all(groupUuid),
      });
    },
  });
};
