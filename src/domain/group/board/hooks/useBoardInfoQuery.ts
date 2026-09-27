import { useQuery } from "@tanstack/react-query";
import { getBoardInfo } from "../apis/board";
import { BOARD_QUERY_KEY } from "../constants/queryKey";

export const useBoardInfoQuery = (groupUuid: string, boardUuid: string) => {
  return useQuery({
    queryKey: BOARD_QUERY_KEY.detail(groupUuid, boardUuid),
    queryFn: () => getBoardInfo(groupUuid, boardUuid),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
