export const WALL_QUERY_KEY = {
  all: (groupUuid: string) => ["groups", groupUuid, "wall"] as const,
  list: (groupUuid: string, page: number, size: number) =>
    ["groups", groupUuid, "wall", "list", { page, size }] as const,
};
