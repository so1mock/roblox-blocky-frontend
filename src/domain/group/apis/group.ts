import { api } from "@common/apis/axios";
import { AxiosError } from "axios";
import type { GroupSummary } from "../types/group";

export const getMyGroups = async (): Promise<GroupSummary[]> => {
  try {
    const response = await api.get("groups/me");
    return response.data.groups;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};

export type GroupInfo = {
  name: string;
  description: string;
};

export const createGroup = async (
  groupInfo: GroupInfo,
): Promise<GroupSummary> => {
  try {
    const response = await api.post("/groups", groupInfo);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.message;
    }
    throw e;
  }
};
