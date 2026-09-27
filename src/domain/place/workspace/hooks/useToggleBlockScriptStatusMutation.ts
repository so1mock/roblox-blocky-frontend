import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBlockScriptStatus } from "@place/workspace/apis/workspace";
import { WORKSPACE_QUERY_KEY } from "@place/workspace/constants/queryKey";

export const useToggleBlockScriptStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      placeUuid,
      objectUuid,
      status,
    }: {
      placeUuid: string;
      objectUuid: string;
      status: "ENABLED" | "DISABLED";
    }) => toggleBlockScriptStatus(placeUuid, objectUuid, status),
    onSuccess: (_, { placeUuid }) => {
      // 워크스페이스 데이터와 최종 수정 시각을 함께 갱신한다
      queryClient.invalidateQueries({
        queryKey: WORKSPACE_QUERY_KEY.all(placeUuid),
      });
    },
  });
};
