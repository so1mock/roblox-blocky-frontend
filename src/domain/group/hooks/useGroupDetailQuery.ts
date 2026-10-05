// src/hooks/useGroupDetailQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getGroupInfo } from "../apis/group";
import { GROUP_QUERY_KEY } from "../constants/queryKey";

export const useGroupDetailQuery = (groupId: string) => {
  return useQuery({
    queryKey: GROUP_QUERY_KEY.detail(groupId),
    queryFn: () => getGroupInfo(groupId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1,
  });
};
