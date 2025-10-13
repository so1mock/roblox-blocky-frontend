import { useEffect, useState } from "react";
import { PlaceCard } from "./PlaceCard";
import { getMyPlaces } from "../apis/place";
import type { PlaceSummary } from "src/domain/place/types/place";
import PlaceConnectGuideModal from "./PlaceConnectGuideModal";
import Dropdown from "@common/components/Dropdown";

const sortOptions = [
  { name: "최신 순", key: "new" },
  { name: "과거 순", key: "old" },
];
function MyPlacePage() {
  const [myPlaces, setMyPlaces] = useState<PlaceSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState({
    name: "최신 순",
    key: "new",
  });
  const [isGuideOpen, setIsGuideOpen] = useState(false);

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
    <div className="w-[1600px]">
      <PlaceConnectGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
      <div>
        <div className="flex justify-between mb-12">
          <h1 className="text-left">
            <span className="text-3xl font-bold">마이 플레이스</span>
          </h1>
          <div className="flex gap-4">
            {/* ℹ️ 안내 버튼 */}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-rbPrimaryColor hover:bg-[#E9F6FF] font-medium transition-all shadow-sm cursor-pointer"
              onClick={() => {
                setIsGuideOpen(true);
              }}
            >
              <img
                src="/infoIcon.png"
                alt="새 플레이스 연결"
                className="w-5 h-5"
              />
              <span className="font-bold text-rbPrimaryColor">
                새 플레이스 연결
              </span>
            </button>
            <Dropdown
              options={sortOptions}
              selected={selectedSort}
              onChange={setSelectedSort}
              width="w-[200px]" // 옵션 (안 넣으면 기본 180px)
            />
          </div>
        </div>
        {isLoading && <div>로딩 중...</div>}
        {!isLoading && error && <div>오류: {error}</div>}
        {!isLoading && !error && myPlaces.length === 0 && (
          <div>플레이스가 없습니다.</div>
        )}
        {!isLoading && !error && myPlaces.length > 0 && (
          <div className="grid grid-cols-4 gap-12">
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
