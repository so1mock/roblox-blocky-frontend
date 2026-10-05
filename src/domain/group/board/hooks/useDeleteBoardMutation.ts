import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../apis/board";
import { BOARD_QUERY_KEY } from "../constants/queryKey";

export const useDeleteBoardMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardUuid: string) => deleteBoard(groupUuid, boardUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BOARD_QUERY_KEY.all(groupUuid),
      });
    },
  });
};
