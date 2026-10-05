export const MY_PLACE_QUERY_KEY = {
  all: ["places"] as const,
  list: () => [...MY_PLACE_QUERY_KEY.all, "list"] as const,
};
