import { api } from "@common/apis/axios";
import { WORKSPACE_ENDPOINT } from "../constants/endpoint";
import { PLACE_ENDPOINT } from "@place/constants/endpoint";
import type { BlockScript, Place } from "../types/workspace";
import type { ConvertedScript } from "../types/script";

export const getWorkspaceDataByPlaceId = async (
  placeId: string,
): Promise<Place> => {
  const response = await api.get(PLACE_ENDPOINT.MY_DETAIL(placeId));
  return response.data;
};

export const toggleBlockScriptStatus = async (
  placeUuid: string,
  objectUuid: string,
  status: "ENABLED" | "DISABLED",
): Promise<void> => {
  await api.put(
    WORKSPACE_ENDPOINT.BLOCK_SCRIPT_ACTIVATION(placeUuid, objectUuid),
    { blockScriptStatus: status },
  );
};

export const saveBlockScript = async (
  placeUuid: string,
  objectUuid: string,
  blockScript: BlockScript,
): Promise<ConvertedScript> => {
  const response = await api.put(
    WORKSPACE_ENDPOINT.BLOCK_SCRIPT(placeUuid, objectUuid),
    blockScript,
  );
  return response.data;
};

export const getStudentWorkspaceDataByPlaceId = async (
  studentId: string,
  placeId: string,
): Promise<Place> => {
  const response = await api.get(PLACE_ENDPOINT.DETAIL(studentId, placeId));
  return response.data;
};

export const getLastUpdatedMyPlaceTime = async (
  placeId: string,
): Promise<string> => {
  const response = await api.get(
    WORKSPACE_ENDPOINT.MY_PLACE_UPDATE_TIME(placeId),
  );
  return response.data.lastUpdateTime;
};

export const getLastUpdatedPlaceTime = async (
  studentId: string,
  placeId: string,
): Promise<string> => {
  const response = await api.get(
    WORKSPACE_ENDPOINT.PLACE_UPDATE_TIME(studentId, placeId),
  );
  return response.data.lastUpdateTime;
};
