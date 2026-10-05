import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroupInfo } from "../apis/group";
import type { GroupSummary } from "../types/group";
import { GROUP_QUERY_KEY } from "../constants/queryKey";

export const useEditGroupMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (editedGroupInfo: GroupSummary) =>
      updateGroupInfo(editedGroupInfo),
    onSuccess: () => {
      // 반 이름/설명은 상세 화면과 내 그룹 목록 양쪽에 보인다
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.detail(id) });
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.myList() });
    },
  });
};
