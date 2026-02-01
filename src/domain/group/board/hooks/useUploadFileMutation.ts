import { useMutation } from "@tanstack/react-query";
import type { FileInfo, FileUploadInfo } from "../../../common/types/file";
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
      await uploadFile(presignedUrl, file, fileUploadInfo.checksum);
      const fileInfo = await confirmFileUpload(attachmentUuid);

      return fileInfo;
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        throw error;
      }
    },
  });
}
