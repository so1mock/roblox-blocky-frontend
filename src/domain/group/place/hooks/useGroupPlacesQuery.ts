import { useQuery } from "@tanstack/react-query";
import { getGroupPlaces } from "../apis/place";

export const useGroupPlacesQuery = (groupUuid: string) => {
  return useQuery({
    queryKey: ["groups", groupUuid, "places"],
    queryFn: () => getGroupPlaces(groupUuid),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
