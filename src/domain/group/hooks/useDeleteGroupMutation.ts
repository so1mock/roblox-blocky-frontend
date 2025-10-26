import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "../apis/group";

export const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGroup(id),
    onSuccess: () => {
      // 그룹 삭제 후, 그룹 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: ["/groups/me"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert("반 삭제 실패: " + error.message);
      }
    },
  });
};
