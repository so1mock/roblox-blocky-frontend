import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMyPlaces } from "src/domain/myPlaces/apis/place";
import type { PlaceSummary } from "src/domain/myPlaces/workspace/types/workspace";
import { PlaceCard } from "src/domain/myPlaces/components/PlaceCard";

export const Route = createFileRoute("/student/_mainLayout/my-places")({
  component: RouteComponent,
});

function RouteComponent() {
  const [myPlaces, setMyPlaces] = useState<PlaceSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyPlaces();
      setMyPlaces(response);
    } catch (e: any) {
      setError(e?.message ?? "플레이스 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 업데이트/삭제는 카드 내부에서 처리

  useEffect(() => {
    refresh();
  }, []);
  return (
    <>
      <div>
        {isLoading && <div>로딩 중...</div>}
        {!isLoading && error && <div>오류: {error}</div>}
        {!isLoading && !error && myPlaces.length === 0 && (
          <div>플레이스가 없습니다.</div>
        )}
        {!isLoading && !error && myPlaces.length > 0 && (
          <div>
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
    </>
  );
}
