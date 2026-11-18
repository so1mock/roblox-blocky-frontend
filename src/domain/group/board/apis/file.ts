import { api } from "@common/apis/axios";
import type { FileInfo, FileUploadInfo } from "../../../common/types/file";
import { ATTACHMENT_ENDPOINT } from "../constants/endpoint";

export const getAttachmentUploadUrl = async (
  fileUploadInfo: FileUploadInfo,
): Promise<{ attachmentUuid: string; presignedUrl: string }> => {
  const response = await api.post(ATTACHMENT_ENDPOINT.PRESIGN, fileUploadInfo);
  return response.data;
};

export const confirmFileUpload = async (
  attachmentUuid: string,
): Promise<FileInfo> => {
  const response = await api.post(ATTACHMENT_ENDPOINT.CONFIRM(attachmentUuid));
  return response.data;
};
