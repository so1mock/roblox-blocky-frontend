export const GROUP_QUERY_KEY = {
  all: ["groups"] as const,
  myList: () => ["groups", "me"] as const,
  // 그룹 하나에 딸린 모든 쿼리(상세/게시판/담벼락/멤버/플레이스)의 접두사
  group: (groupUuid: string) => ["groups", groupUuid] as const,
  detail: (groupUuid: string) => ["groups", groupUuid, "detail"] as const,
};
