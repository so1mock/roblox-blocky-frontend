// 플레이스 단건 경로는 PLACE_ENDPOINT.MY_DETAIL 을 쓴다 (place 도메인과 공유).
export const MY_PLACE_ENDPOINT = {
  LIST: "/places/me",
  THUMBNAIL_UPLOAD_URL: (placeUuid: string) =>
    `/place/${placeUuid}/thumbnail-upload-url`,
} as const;
