import axios, { AxiosError } from "axios";

// presigned url로 이미지를 업로드
export const uploadImage = async (url: string, file: File) => {
  const headers = {
    "content-type": file.type,
  };
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
