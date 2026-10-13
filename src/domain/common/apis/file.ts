import axios from "axios";
import { ApiError } from "./ApiError";

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

  // presigned URL 은 공용 api 인스턴스를 거치지 않으므로
  // 인터셉터의 ApiError 변환이 적용되지 않는다. 여기서 직접 맞춰준다.
  try {
    const response = await axios.put(url, file, { headers });
    return 200 <= response.status && response.status < 300;
  } catch (error) {
    throw ApiError.from(error);
  }
};
