import { useQuery } from "@tanstack/react-query";
import { getMyGroups } from "../apis/group";
import { GROUP_QUERY_KEY } from "../constants/queryKey";

export const useMyGroupsQuery = () => {
  return useQuery({
    queryKey: GROUP_QUERY_KEY.myList(),
    queryFn: getMyGroups,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 한 번만 재시도
  });
};
