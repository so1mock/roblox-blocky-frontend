import { api } from "@common/apis/axios";
import type { BlockScript, Place } from "../types/workspace";
import { AxiosError } from "axios";
import type { ConvertedScript } from "../types/script";

export const getWorkspaceDataByPlaceId = async (
  placeId: string,
): Promise<Place> => {
  try {
    const response = await api.get(`/place/me/${placeId}`);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export const toggleBlockScriptStatus = async (
  placeUuid: string,
  objectUuid: string,
  status: "ENABLED" | "DISABLED",
): Promise<void> => {
  try {
    await api.put(`/block-script/activation/${placeUuid}/${objectUuid}`, {
      blockScriptStatus: status,
    });
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export const saveBlockScript = async (
  placeUuid: string,
  objectUuid: string,
  blockScript: BlockScript,
): Promise<ConvertedScript> => {
  try {
    const response = await api.put(
      `/block-script/${placeUuid}/${objectUuid}`,
      blockScript,
    );
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
