export const GROUP_MEMBER_QUERY_KEY = {
  all: (groupUuid: string) => ["groups", groupUuid, "members"] as const,
  list: (groupUuid: string) =>
    ["groups", groupUuid, "members", "list"] as const,
};
