import { uploadImage } from "@common/apis/image";
import type { ImageFileType } from "@common/types/image";
import { validateImageExtension } from "@common/utils/validateImageExtension";
import { getPlaceThumbnailUploadUrl } from "@myPlace/apis/place";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadPlaceThumbnailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, file }: { uuid: string; file: File }) => {
      const ext = file.name.split(".").pop()?.toLowerCase();

      // jpeg, jpg, png만 허용
      validateImageExtension(file);

      const url = await getPlaceThumbnailUploadUrl(uuid, ext as ImageFileType);
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
