import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWall } from "../apis/wall";

export const useCreateWallMutation = (
  groupUuid: string,
  page: number,
  size: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createWall({ groupUuid, content }),

    onSuccess: () => {
      // ✅ 수정 후 벽글 리스트 캐시 갱신
      queryClient.invalidateQueries({
        queryKey: ["group", groupUuid, "wall", page, size],
      });
    },

    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });
};
