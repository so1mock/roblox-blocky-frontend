import { api } from "@common/apis/axios";
import type { WorkspaceData } from "../types/workspace";

export const getWorkspaceData = async (placeId: string): Promise<WorkspaceData> => {
  const response = await api.get(`/place/${placeId}`);
  return response.data;
};
