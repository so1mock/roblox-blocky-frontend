import { useQuery } from "@tanstack/react-query";
import { getGroupPlaces } from "../apis/place";
import { GROUP_PLACE_QUERY_KEY } from "../constants/queryKey";

export const useGroupPlacesQuery = (groupUuid: string) => {
  return useQuery({
    queryKey: GROUP_PLACE_QUERY_KEY.list(groupUuid),
    queryFn: () => getGroupPlaces(groupUuid),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
