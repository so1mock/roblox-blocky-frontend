import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWall } from "../apis/wall";
import { WALL_QUERY_KEY } from "../constants/queryKey";

export const useDeleteWallMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deleteWall(uuid),
    onSuccess: () => {
      // 글이 줄면 페이지 구성이 통째로 밀리므로 모든 페이지를 무효화한다
      queryClient.invalidateQueries({
        queryKey: WALL_QUERY_KEY.all(groupUuid),
      });
    },
  });
};
