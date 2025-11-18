import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../apis/board";

export const useDeleteBoardMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardUuid: string) => deleteBoard(groupUuid, boardUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups", groupUuid, "boards", 0],
      });
    },
  });
};
