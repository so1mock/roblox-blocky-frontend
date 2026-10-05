import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWall } from "../apis/wall";
import { WALL_QUERY_KEY } from "../constants/queryKey";

export const useCreateWallMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createWall({ groupUuid, content }),
    onSuccess: () => {
      // 글이 늘면 페이지 구성이 통째로 밀리므로 모든 페이지를 무효화한다
      queryClient.invalidateQueries({
        queryKey: WALL_QUERY_KEY.all(groupUuid),
      });
    },
  });
};
