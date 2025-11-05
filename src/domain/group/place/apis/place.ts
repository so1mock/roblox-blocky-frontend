import { api } from "@common/apis/axios";
import type { GroupPlaces } from "../../user/types/user";
import { AxiosError } from "axios";

// 그룹 내 모든 멤버의 플레이스 조회
export const getGroupPlaces = async (
  groupUuid: string,
): Promise<GroupPlaces[]> => {
  try {
    const response = await api.get(`groups/${groupUuid}/places`);
    return response.data.members;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
    throw e;
  }
};
