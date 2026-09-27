import { useQuery } from "@tanstack/react-query";
import { getLastUpdatedMyPlaceTime } from "@place/workspace/apis/workspace";
import { WORKSPACE_QUERY_KEY } from "@place/workspace/constants/queryKey";
import { WORKSPACE_POLLING_INTERVAL } from "@place/workspace/constants/polling";

export const useLastUpdatedMyPlaceTimeQuery = (
  placeId: string,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: WORKSPACE_QUERY_KEY.myUpdateTime(placeId),
    queryFn: () => getLastUpdatedMyPlaceTime(placeId),
    enabled: (options?.enabled ?? true) && !!placeId,
    // 수정 여부만 확인하는 경량 응답이라 짧은 주기로 폴링한다
    refetchInterval: WORKSPACE_POLLING_INTERVAL,
  });
};
