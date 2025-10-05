import { useEffect, useState } from "react";
import { PlaceCard } from "./PlaceCard";
import { getMyPlaces } from "../apis/place";
import type { PlaceSummary } from "src/domain/place/types/place";

function MyPlacePage() {
  const [myPlaces, setMyPlaces] = useState<PlaceSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyPlaces();
      setMyPlaces(response);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message ?? "플레이스 목록을 불러오지 못했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="flex justify-center w-[1200px] items-center">
      <div>
        <h1 className="mb-12 text-left">
          <span className="text-3xl font-bold">마이 플레이스</span>
        </h1>

        {isLoading && <div>로딩 중...</div>}
        {!isLoading && error && <div>오류: {error}</div>}
        {!isLoading && !error && myPlaces.length === 0 && (
          <div>플레이스가 없습니다.</div>
        )}
        {!isLoading && !error && myPlaces.length > 0 && (
          <div className="flex flex-col items-center">
            {myPlaces.map((placeSummary) => (
              <PlaceCard
                key={placeSummary.uuid}
                place={placeSummary}
                onChanged={refresh}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPlacePage;
