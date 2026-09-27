export const BLOCK_QUERY_KEY = {
  all: ["blocks"] as const,
  list: () => [...BLOCK_QUERY_KEY.all, "list"] as const,
};
