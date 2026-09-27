import { PLACE_ENDPOINT } from "@place/constants/endpoint";

// 플레이스 자체 경로는 PLACE_ENDPOINT 를 쓰고, 여기서는 편집기 전용 경로만 정의한다.
export const WORKSPACE_ENDPOINT = {
  MY_PLACE_UPDATE_TIME: (placeId: string) =>
    `${PLACE_ENDPOINT.MY_DETAIL(placeId)}/update-time`,
  PLACE_UPDATE_TIME: (studentId: string, placeId: string) =>
    `${PLACE_ENDPOINT.DETAIL(studentId, placeId)}/update-time`,
  BLOCK_SCRIPT: (placeUuid: string, objectUuid: string) =>
    `/block-script/${placeUuid}/${objectUuid}`,
  BLOCK_SCRIPT_ACTIVATION: (placeUuid: string, objectUuid: string) =>
    `/block-script/activation/${placeUuid}/${objectUuid}`,
} as const;
