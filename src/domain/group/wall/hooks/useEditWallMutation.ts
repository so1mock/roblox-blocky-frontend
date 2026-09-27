import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editWall } from "../apis/wall";
import { WALL_QUERY_KEY } from "../constants/queryKey";

export const useEditWallMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, content }: { uuid: string; content: string }) =>
      editWall({ messageUuid: uuid, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: WALL_QUERY_KEY.all(groupUuid),
      });
    },
  });
};
