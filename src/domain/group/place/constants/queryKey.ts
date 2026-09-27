export const GROUP_PLACE_QUERY_KEY = {
  all: (groupUuid: string) => ["groups", groupUuid, "places"] as const,
  list: (groupUuid: string) => ["groups", groupUuid, "places", "list"] as const,
};
