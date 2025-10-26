import { api } from "@common/apis/axios";
import type { BlockScript, Place } from "../types/workspace";
import { AxiosError } from "axios";
import type { ConvertedScript } from "../types/script";

export const getWorkspaceDataByPlaceId = async (
  placeId: string,
): Promise<Place> => {
  try {
    const response = await api.get(`/place/${placeId}`);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export const toggleBlockScriptStatus = async (
  uuid: string,
  status: "ENABLED" | "DISABLED",
): Promise<void> => {
  try {
    await api.put(`/block-script/activation/${uuid}`, {
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
  uuid: string,
  blockScript: BlockScript,
): Promise<ConvertedScript> => {
  try {
    const response = await api.put(`/block-script/${uuid}`, blockScript);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
