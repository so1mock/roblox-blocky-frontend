import { updatePlace } from "@myPlace/apis/place";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PlaceInfo } from "@myPlace/apis/place";

export const useEditPlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeInfo: PlaceInfo) => updatePlace(placeInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places/me"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });
};
