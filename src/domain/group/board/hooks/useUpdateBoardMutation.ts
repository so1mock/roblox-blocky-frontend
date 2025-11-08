import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../apis/board";
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
      queryClient.invalidateQueries({
        queryKey: ["groups", groupUuid, "boards"],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });
};
