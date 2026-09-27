import { useQuery } from "@tanstack/react-query";
import { getGroupMemberList } from "../apis/user";
import { GROUP_MEMBER_QUERY_KEY } from "../constants/queryKey";

export const useGroupMembersQuery = (groupUuid: string) => {
  return useQuery({
    queryKey: GROUP_MEMBER_QUERY_KEY.list(groupUuid),
    queryFn: () => getGroupMemberList(groupUuid),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
