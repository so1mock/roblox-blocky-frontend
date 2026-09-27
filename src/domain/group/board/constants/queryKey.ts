export const BOARD_QUERY_KEY = {
  all: (groupUuid: string) => ["groups", groupUuid, "boards"] as const,
  list: (groupUuid: string, page: number, size: number) =>
    ["groups", groupUuid, "boards", "list", { page, size }] as const,
  detail: (groupUuid: string, boardUuid: string) =>
    ["groups", groupUuid, "boards", "detail", boardUuid] as const,
};
