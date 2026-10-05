import { api } from "@common/apis/axios";
import type { FileInfo, FileUploadInfo } from "../../../common/types/file";
import { AxiosError } from "axios";
import { ATTACHMENT_ENDPOINT } from "../constants/endpoint";

export const getAttachmentUploadUrl = async (
  fileUploadInfo: FileUploadInfo,
): Promise<{ attachmentUuid: string; presignedUrl: string }> => {
  try {
    const response = await api.post(
      ATTACHMENT_ENDPOINT.PRESIGN,
      fileUploadInfo,
    );
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
    const response = await api.post(
      ATTACHMENT_ENDPOINT.CONFIRM(attachmentUuid),
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};
