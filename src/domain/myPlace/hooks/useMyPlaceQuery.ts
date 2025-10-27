import { getMyPlaces } from "@myPlace/apis/place";
import { useQuery } from "@tanstack/react-query";

export const useMyPlaceQuery = () => {
  return useQuery({
    queryKey: ["/places/me"],
    queryFn: getMyPlaces,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
