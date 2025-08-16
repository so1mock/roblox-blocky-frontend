import { api } from "@common/apis/axios";
import type { PlacesResponse } from "@place/types/place";

export const placeApi = {
  // 사용자의 플레이스 목록 조회
  getMyPlaces: async (): Promise<PlacesResponse> => {
    const response = await api.get<PlacesResponse>("/places/me");
    return response.data;
  },
};
