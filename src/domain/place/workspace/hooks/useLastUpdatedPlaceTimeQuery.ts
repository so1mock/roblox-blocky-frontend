import { useQuery } from "@tanstack/react-query";
import { getLastUpdatedPlaceTime } from "@place/workspace/apis/workspace";
import { WORKSPACE_QUERY_KEY } from "@place/workspace/constants/queryKey";
import { WORKSPACE_POLLING_INTERVAL } from "@place/workspace/constants/polling";

export const useLastUpdatedPlaceTimeQuery = (
  studentId: string | undefined,
  placeId: string,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: WORKSPACE_QUERY_KEY.studentUpdateTime(placeId, studentId ?? ""),
    queryFn: () => getLastUpdatedPlaceTime(studentId!, placeId),
    enabled: (options?.enabled ?? true) && !!studentId && !!placeId,
    // 수정 여부만 확인하는 경량 응답이라 짧은 주기로 폴링한다
    refetchInterval: WORKSPACE_POLLING_INTERVAL,
  });
};
