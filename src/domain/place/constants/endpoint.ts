// 플레이스 리소스의 기준 경로.
// myPlace(목록/수정)와 place/workspace(편집기)가 같은 경로를 쓰므로 여기서만 정의한다.
export const PLACE_ENDPOINT = {
  MY_DETAIL: (placeId: string) => `/place/me/${placeId}`,
  DETAIL: (studentId: string, placeId: string) =>
    `/place/${studentId}/${placeId}`,
} as const;

export const BLOCK_ENDPOINT = {
  LIST: "/block/list",
  CUSTOM_CATEGORIES: "/block/custom/categories",
  LIST_BY_CATEGORY: (categoryName: string) => `/block/list/${categoryName}`,
} as const;
