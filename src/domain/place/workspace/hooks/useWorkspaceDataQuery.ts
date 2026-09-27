import { useQuery } from "@tanstack/react-query";
import { getWorkspaceDataByPlaceId } from "@place/workspace/apis/workspace";
import { WORKSPACE_QUERY_KEY } from "@place/workspace/constants/queryKey";

export const useWorkspaceDataQuery = (
  placeId: string,
  options?: { lastUpdatedTime?: string; enabled?: boolean },
) => {
  return useQuery({
    // 서버의 최종 수정 시각을 키에 넣어, 시각이 바뀔 때만 전체 데이터를 다시 받는다
    queryKey: WORKSPACE_QUERY_KEY.myDetail(placeId, options?.lastUpdatedTime),
    queryFn: () => getWorkspaceDataByPlaceId(placeId),
    enabled:
      (options?.enabled ?? true) && !!placeId && !!options?.lastUpdatedTime,
  });
};
