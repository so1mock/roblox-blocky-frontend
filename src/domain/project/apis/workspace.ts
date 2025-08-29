import { api } from "@common/apis/axios";
import type { WorkspaceData } from "../blockly/types/workspace";
import { AxiosError } from "axios";

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
