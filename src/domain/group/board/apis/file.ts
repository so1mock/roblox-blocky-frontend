import { api } from "@common/apis/axios";
import type { FileInfo, FileUploadInfo } from "../../../common/types/file";
import { AxiosError } from "axios";

export const getAttachmentUploadUrl = async (
  fileUploadInfo: FileUploadInfo,
): Promise<{ attachmentUuid: string; presignedUrl: string }> => {
  try {
    const response = await api.post("/attachments/presign", fileUploadInfo);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const confirmFileUpload = async (
  attachmentUuid: string,
): Promise<FileInfo> => {
  try {
    const response = await api.post(`/attachments/${attachmentUuid}/confirm`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};
