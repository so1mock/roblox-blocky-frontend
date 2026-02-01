import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroup } from "../user/apis/user";

export const useJoinGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inviteCode: string) => joinGroup(inviteCode),
    onSuccess: () => {
      // 그룹 가입 후, 그룹 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: ["/groups/me"] });
    },
  });
};
