import { uploadImage } from "@common/apis/image";
import type { ImageFileType } from "@common/types/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGroupIconUploadUrl } from "../apis/group";

export const useUpdateGroupIconMutation = (uuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, file }: { uuid: string; file: File }) => {
      const ext = file.name.split(".").pop()?.toLowerCase();

      // jpeg, jpg, png만 허용
      if (!ext || !["jpeg", "jpg", "png"].includes(ext)) {
        throw new Error(
          "허용되지 않은 이미지 형식입니다. (jpeg, jpg, png만 가능합니다)",
        );
      }

      const url = await getGroupIconUploadUrl(uuid, ext as ImageFileType);
      await uploadImage(url, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", uuid] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });
};
