import { useQuery } from "@tanstack/react-query";
import { getGroupBoards } from "../apis/board";

export const useGroupBoardsQuery = (
  groupUuid: string,
  page: number,
  size: number = 10,
) => {
  return useQuery({
    queryKey: ["groups", groupUuid, "boards", page, size],
    queryFn: () => getGroupBoards(groupUuid, page, size),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
