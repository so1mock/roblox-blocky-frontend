// src/hooks/useWallListQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getGroupWalls } from "../apis/wall";

export const useWallListQuery = (
  groupId: string,
  page: number,
  size: number = 10,
) => {
  return useQuery({
    queryKey: ["group", groupId, "wall", page, size],
    queryFn: () => getGroupWalls(groupId, page, size),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1,
  });
};
