import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../apis/board";

export const useDeleteBoardMutation = (
  groupUuid: string,
  boardUuid: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBoard(groupUuid, boardUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups", groupUuid, "boards"],
      });
    },
  });
};
