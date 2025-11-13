import { useMutation } from "@tanstack/react-query";
import type { FileInfo, FileUploadInfo } from "../types/file";
import { getAttachmentUploadUrl } from "../apis/file";
import { uploadFile } from "@common/apis/file";
import { confirmFileUpload } from "../apis/file";

export function useUploadFileMutation() {
  return useMutation({
    mutationFn: async ({
      fileUploadInfo,
      file,
    }: {
      fileUploadInfo: FileUploadInfo;
      file: File;
    }): Promise<FileInfo> => {
      const { attachmentUuid, presignedUrl } =
        await getAttachmentUploadUrl(fileUploadInfo);
      await uploadFile(presignedUrl, file);
      const fileInfo = await confirmFileUpload(attachmentUuid);

      return fileInfo;
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      }
    },
  });
}
