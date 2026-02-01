import { uploadFile } from "@common/apis/file";
import type { ImageFileType } from "@common/types/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGroupIconUploadUrl } from "../apis/group";
import { validateImageExtension } from "@common/utils/validateImageExtension";

export const useUpdateGroupIconMutation = (uuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const ext = file.name.split(".").pop()?.toLowerCase();

      // jpeg, jpg, png만 허용
      validateImageExtension(file);

      const url = await getGroupIconUploadUrl(uuid, ext as ImageFileType);
      await uploadFile(url, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", uuid] });
    },
  });
};
