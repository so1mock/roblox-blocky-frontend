import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup, type CreateGroupRequest } from "../apis/group";
import { GROUP_QUERY_KEY } from "../constants/queryKey";

export const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupInfo: CreateGroupRequest) => createGroup(groupInfo),
    onSuccess: () => {
      // 그룹 생성 후, 그룹 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.myList() });
    },
  });
};
