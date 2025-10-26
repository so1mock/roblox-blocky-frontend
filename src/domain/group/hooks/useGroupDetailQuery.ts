// src/hooks/useGroupDetailQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getGroupInfo } from "../apis/group";

export const useGroupDetailQuery = (groupId: string) => {
  return useQuery({
    queryKey: ["groupDetail", groupId],
    queryFn: () => getGroupInfo(groupId),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1,
  });
};
