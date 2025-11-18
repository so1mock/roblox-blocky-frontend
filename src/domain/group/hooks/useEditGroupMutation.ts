import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroupInfo } from "../apis/group";
import type { GroupSummary } from "../types/group";

export const useEditGroupMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (editedGroupInfo: GroupSummary) =>
      updateGroupInfo(editedGroupInfo),
    onSuccess: () => {
      // 그룹 생성 후, 그룹 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: ["group", id] });
    },
  });
};
