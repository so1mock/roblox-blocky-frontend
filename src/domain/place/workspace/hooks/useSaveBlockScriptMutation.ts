import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveBlockScript } from "@place/workspace/apis/workspace";
import { WORKSPACE_QUERY_KEY } from "@place/workspace/constants/queryKey";
import type { BlockScript } from "@place/workspace/types/workspace";

export const useSaveBlockScriptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      placeUuid,
      objectUuid,
      blockScript,
    }: {
      placeUuid: string;
      objectUuid: string;
      blockScript: BlockScript;
    }) => saveBlockScript(placeUuid, objectUuid, blockScript),
    onSuccess: (_, { placeUuid }) => {
      // 워크스페이스 데이터와 최종 수정 시각을 함께 갱신한다
      queryClient.invalidateQueries({
        queryKey: WORKSPACE_QUERY_KEY.all(placeUuid),
      });
    },
  });
};
