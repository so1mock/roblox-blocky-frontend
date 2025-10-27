import { deletePlace } from "@myPlace/apis/place";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uuid: string) => deletePlace(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/places/me"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });
};
