import axios, { AxiosError } from "axios";

// presigned url로 파일 업로드
export const uploadFile = async (
  url: string,
  file: File,
  checksum?: string,
): Promise<boolean> => {
  const headers: Record<string, string> = {
    "Content-Type": file.type,
  };
  if (checksum) {
    headers["x-amz-checksum-sha256"] = checksum;
  }

  try {
    const response = await axios.put(url, file, { headers });
    return 200 <= response.status && response.status < 300;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};
