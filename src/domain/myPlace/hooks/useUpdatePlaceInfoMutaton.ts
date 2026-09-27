import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlace } from "@myPlace/apis/place";
import { MY_PLACE_QUERY_KEY } from "@myPlace/constants/queryKey";

export const useUpdatePlaceInfoMutaton = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      uuid,
      editedPlaceName,
    }: {
      uuid: string;
      editedPlaceName: string;
    }) =>
      updatePlace({
        uuid: uuid,
        name: editedPlaceName,
        description: "",
      }),
    onSuccess: () => {
      // 플레이스 정보 수정 후, 플레이스 목록 자동 갱신
      queryClient.invalidateQueries({ queryKey: MY_PLACE_QUERY_KEY.list() });
    },
  });
};
