import { api } from "@common/apis/axios";
import { AxiosError } from "axios";
import type { PlaceSummary } from "@place/types/place";
import type { ImageFileType } from "@common/types/image";
import { MY_PLACE_ENDPOINT } from "../constants/endpoint";
import { PLACE_ENDPOINT } from "@place/constants/endpoint";

type PlaceInfo = {
  uuid: string;
  name: string;
  description: string;
};

export const getMyPlaces = async (): Promise<PlaceSummary[]> => {
  try {
    const response = await api.get(MY_PLACE_ENDPOINT.LIST);
    return response.data.places;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

export const updatePlace = async (placeInfo: PlaceInfo) => {
  try {
    const response = await api.put(PLACE_ENDPOINT.MY_DETAIL(placeInfo.uuid), {
      name: placeInfo.name,
      description: placeInfo.description,
    });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

export const deletePlace = async (placeUuid: string): Promise<boolean> => {
  try {
    const response = await api.delete(PLACE_ENDPOINT.MY_DETAIL(placeUuid));
    return 200 <= response.status && response.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};

// 플레이스 썸네일 업로드 presignedUrl 발급
export const getPlaceThumbnailUploadUrl = async (
  uuid: string,
  type: ImageFileType,
): Promise<string> => {
  try {
    const response = await api.post(
      MY_PLACE_ENDPOINT.THUMBNAIL_UPLOAD_URL(uuid),
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
