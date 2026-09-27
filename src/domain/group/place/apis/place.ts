import { api } from "@common/apis/axios";
import type { GroupMemberPlaces } from "../types/place";
import { AxiosError } from "axios";
import { GROUP_PLACE_ENDPOINT } from "../constants/endpoint";

// 그룹 내 모든 멤버의 플레이스 조회
export const getGroupPlaces = async (
  groupUuid: string,
): Promise<GroupMemberPlaces[]> => {
  try {
    const response = await api.get(GROUP_PLACE_ENDPOINT.LIST(groupUuid));
    return response.data.members;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};
