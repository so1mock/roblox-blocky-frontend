import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateBoardInfo } from "../types/board";
import { createBoard } from "../apis/board";

export const useCreateBoardMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardInfo: CreateBoardInfo) =>
      createBoard(groupUuid, boardInfo),
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
