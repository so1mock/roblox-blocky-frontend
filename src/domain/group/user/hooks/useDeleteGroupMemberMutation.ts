import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroupMember } from "../apis/user";
import { GROUP_MEMBER_QUERY_KEY } from "../constants/queryKey";

export const useDeleteGroupMemberMutation = (groupUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberUuid: string) =>
      deleteGroupMember(groupUuid, memberUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GROUP_MEMBER_QUERY_KEY.all(groupUuid),
      });
    },
  });
};
