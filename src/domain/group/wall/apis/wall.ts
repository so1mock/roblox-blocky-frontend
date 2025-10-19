import { api } from "@common/apis/axios";
import type { Wall } from "../types/wall";
import { AxiosError } from "axios";

export const getGroupWalls = async (groupUuid: string): Promise<Wall[]> => {
  try {
    const response = await api.get(`/groups/${groupUuid}/wall/messages`);
    return response.data.wallMessages;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
