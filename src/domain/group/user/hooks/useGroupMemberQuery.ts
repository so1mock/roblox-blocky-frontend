import { useQuery } from "@tanstack/react-query";
import { getGroupMemberList } from "../apis/user";

export const useGroupMembersQuery = (groupUuid: string) => {
  return useQuery({
    queryKey: ["groups", groupUuid, "members"],
    queryFn: () => getGroupMemberList(groupUuid),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
