import { useQuery } from "@tanstack/react-query";
import { getMyPlaces } from "@myPlace/apis/place";
import { MY_PLACE_QUERY_KEY } from "@myPlace/constants/queryKey";

export const useMyPlacesQuery = () => {
  return useQuery({
    queryKey: MY_PLACE_QUERY_KEY.list(),
    queryFn: getMyPlaces,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 한 번만 재시도
  });
};
