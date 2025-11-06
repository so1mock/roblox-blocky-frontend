import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../apis/board";
import type { UpdateBoardInfo } from "../types/board";

export const useUpdateBoardMutation = (
  groupUuid: string,
  boardUuid: string,
  boardInfo: UpdateBoardInfo,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateBoard(groupUuid, boardUuid, boardInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups", groupUuid, "boards", boardUuid],
      });
    },
  });
};
