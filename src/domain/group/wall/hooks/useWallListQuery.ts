// src/hooks/useWallListQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getGroupWalls } from "../apis/wall";
import { WALL_QUERY_KEY } from "../constants/queryKey";

export const useWallListQuery = (
  groupId: string,
  page: number,
  size: number = 10,
) => {
  return useQuery({
    queryKey: WALL_QUERY_KEY.list(groupId, page, size),
    queryFn: () => getGroupWalls(groupId, page, size),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1,
  });
};
