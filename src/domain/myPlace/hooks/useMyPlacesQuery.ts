import { useQuery } from "@tanstack/react-query";
import { getMyPlaces } from "@myPlace/apis/place";

export const useMyPlacesQuery = () => {
  return useQuery({
    queryKey: ["/places/me"],
    queryFn: getMyPlaces,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    retry: 1, // 실패 시 한 번만 재시도
  });
};
