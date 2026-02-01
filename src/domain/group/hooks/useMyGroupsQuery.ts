import { useQuery } from "@tanstack/react-query";
import { getMyGroups } from "../apis/group";

export const useMyGroupsQuery = () => {
  return useQuery({
    queryKey: ["/groups/me"],
    queryFn: getMyGroups,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 한 번만 재시도
  });
};
