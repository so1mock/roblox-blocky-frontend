import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroupMember } from "../apis/user";

export const useDeleteGroupMemberMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberUuid: string) =>
      deleteGroupMember(groupUuid, memberUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups", groupUuid, "members"],
      });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert("사용자 탈퇴 실패: " + error.message);
      }
    },
  });
};
