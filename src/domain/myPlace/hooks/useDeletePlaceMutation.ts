import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlace } from "@myPlace/apis/place";

export const useDeletePlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deletePlace(uuid),
    onSuccess: () => {
      // 그룹 가입 후, 그룹 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: ["/places/me"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert("삭제 실패: " + error.message);
      }
    },
  });
};
