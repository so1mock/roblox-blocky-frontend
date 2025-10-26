import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWall } from "../apis/wall";

export const useCreateWall = (groupId: string, page: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uuid, content }: { uuid: string; content: string }) =>
      createWall({ groupUuid: uuid, content }),

    onSuccess: () => {
      // ✅ 수정 후 벽글 리스트 캐시 갱신
      queryClient.invalidateQueries({
        queryKey: ["group", groupId, "wall", page],
      });
    },

    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });
};
