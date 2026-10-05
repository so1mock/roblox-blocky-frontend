import { useQuery } from "@tanstack/react-query";
import { getGroupBoards } from "../apis/board";
import { BOARD_QUERY_KEY } from "../constants/queryKey";

export const useGroupBoardsQuery = (
  groupUuid: string,
  page: number,
  size: number = 10,
) => {
  return useQuery({
    queryKey: BOARD_QUERY_KEY.list(groupUuid, page, size),
    queryFn: () => getGroupBoards(groupUuid, page, size),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
