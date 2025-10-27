import axios, { AxiosError } from "axios";
import { api } from "./axios";

// presigned url로 이미지를 업로드
export const uploadImage = async (url: string, file: File) => {
  // const fd = new FormData();
  // fd.append("file", file); // 파라미터 이름이 뭔지 알아야 한다?
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

// presigned url 발급
export const getGroupIconUrl = async (uuid: string): Promise<string> => {
  try {
    const response = await api.get(`/groups/${uuid}/icon-upload-url`);
    return response.data.uploadUrl;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const getPlaceThumbnailUrl = async (
  uuid: string,
  type: "JPEG" | "PNG",
): Promise<string> => {
  try {
    const response = await api.post(
      `/place/${uuid}/thumbnail-upload-url`,
      null,
      {
        params: {
          type,
        },
      },
    );
    return response.data.url;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};
