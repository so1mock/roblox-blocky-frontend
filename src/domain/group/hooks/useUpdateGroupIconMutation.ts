import { uploadFile } from "@common/apis/file";
import type { ImageFileType } from "@common/types/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGroupIconUploadUrl } from "../apis/group";
import { validateImageExtension } from "@common/utils/validateImageExtension";
import { GROUP_QUERY_KEY } from "../constants/queryKey";

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
      // 아이콘은 상세 화면과 내 그룹 목록 양쪽에 보인다
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.detail(uuid) });
      queryClient.invalidateQueries({ queryKey: GROUP_QUERY_KEY.myList() });
    },
  });
};
