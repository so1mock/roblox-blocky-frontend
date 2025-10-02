import { api } from "@common/apis/axios";
import { AxiosError } from "axios";
import type { PlaceSummary } from "../workspace/types/workspace";

export const getMyPlaces = async (): Promise<PlaceSummary[]> => {
  try {
    const response = await api.get("/places/me");
    return response.data.places;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export const updatePlace = async (
  placeUuid: string,
  name: string,
  description: string,
) => {
  try {
    const response = await api.put(`/place/${placeUuid}`, {
      name: name,
      description: description,
    });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export const deletePlace = async (placeUuid: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/place/${placeUuid}`);
    return 200 <= response.status && response.status < 300;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
