import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWall } from "../apis/wall";

export const useDeleteWallMutation = (
  groupId: string,
  page: number,
  size: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deleteWall(uuid),
    onSuccess: () => {
      // 그룹 가입 후, 그룹 목록 자동 갱신
      queryClient.invalidateQueries({
        queryKey: ["group", groupId, "wall", page, size],
      });
    },
  });
};
