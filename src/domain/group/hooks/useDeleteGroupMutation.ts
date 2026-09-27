import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "../apis/group";
import { GROUP_QUERY_KEY } from "../constants/queryKey";

export const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGroup(id),
    onSuccess: () => {
      // 그룹 삭제 후, 그룹 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.myList() });
    },
  });
};
