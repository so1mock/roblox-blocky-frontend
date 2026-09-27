export const WORKSPACE_QUERY_KEY = {
  // 한 플레이스에 딸린 모든 쿼리. mutation 은 이 접두사로 한 번에 무효화한다.
  all: (placeId: string) => ["workspaces", placeId] as const,

  myDetail: (placeId: string, lastUpdatedTime?: string) =>
    ["workspaces", placeId, "me", "detail", lastUpdatedTime] as const,
  myUpdateTime: (placeId: string) =>
    ["workspaces", placeId, "me", "update-time"] as const,

  studentDetail: (
    placeId: string,
    studentId: string,
    lastUpdatedTime?: string,
  ) => ["workspaces", placeId, studentId, "detail", lastUpdatedTime] as const,
  studentUpdateTime: (placeId: string, studentId: string) =>
    ["workspaces", placeId, studentId, "update-time"] as const,
};
