import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlace } from "@myPlace/apis/place";

export const useDeletePlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deletePlace(uuid),
    onSuccess: () => {
      // 플레이스 삭제 후, 플레이스 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: ["/places/me"] });
    },
  });
};
