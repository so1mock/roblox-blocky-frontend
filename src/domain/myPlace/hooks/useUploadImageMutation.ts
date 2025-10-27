import { getPlaceThumbnailUrl, uploadImage } from "@common/apis/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, file }: { uuid: string; file: File }) => {
      const type = file.type === "image/jpeg" ? "JPEG" : "PNG";
      const url = await getPlaceThumbnailUrl(uuid, type);
      await uploadImage(url, file);
    },
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
