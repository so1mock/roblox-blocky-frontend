import { useQuery } from "@tanstack/react-query";
import { getBoardInfo } from "../apis/board";

export const useBoardInfoQuery = (groupUuid: string, boardUuid: string) => {
  return useQuery({
    queryKey: ["groups", groupUuid, "boards", boardUuid],
    queryFn: () => getBoardInfo(groupUuid, boardUuid),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
