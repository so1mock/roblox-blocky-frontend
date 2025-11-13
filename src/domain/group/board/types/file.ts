export type FileInfo = {
  attachmentUuid: string;
  fileName: string;
  fileSrc: string;
  fileSize: number;
};

// presigned url 발급받기 위해 필요한 정보
export type FileUploadInfo = {
  fileName: string;
  contentLength: number;
  contentType: string;
  checksum: string;
};
