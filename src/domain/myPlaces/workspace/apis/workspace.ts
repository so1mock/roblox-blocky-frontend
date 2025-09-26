import { api } from "@common/apis/axios";
import type {
  BlockScript,
  PlaceSummary,
  WorkspaceData,
} from "../types/workspace";
import { AxiosError } from "axios";
import type { ConvertedScript } from "../types/script";

export const getWorkspaceDataByPlaceId = async (
  placeId: string,
): Promise<WorkspaceData> => {
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

export const getMyPlaces = async (): Promise<PlaceSummary[]> => {
  const response = await api.get("/places/me");
  return response.data.places;
};
