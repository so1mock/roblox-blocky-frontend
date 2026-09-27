import { useQuery } from "@tanstack/react-query";
import { getBlockList } from "@place/apis/block";
import { BLOCK_QUERY_KEY } from "@place/constants/queryKey";

export const useBlockListQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: BLOCK_QUERY_KEY.list(),
    queryFn: getBlockList,
    enabled: options?.enabled ?? true,
    // 블록 정의는 거의 바뀌지 않으므로 자주 다시 받아오지 않는다
    staleTime: 1000 * 60 * 10,
  });
};
