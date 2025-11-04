import { useState } from "react";
import { PlaceCard } from "./PlaceCard";
import PlaceConnectGuideModal from "./PlaceConnectGuideModal";
import Dropdown from "@common/components/Dropdown";
import { useMyPlacesQuery } from "@myPlace/hooks/useMyPlacesQuery";

const sortOptions = [
  { name: "최신 순", key: "new" },
  { name: "과거 순", key: "old" },
];
function MyPlacePage() {
  const {
    data: myPlaces = [],
    isLoading: isMyPlacesLoading,
    isError: isMyPlacesError,
    error: myPlacesError,
  } = useMyPlacesQuery();

  const [selectedSort, setSelectedSort] = useState({
    name: "최신 순",
    key: "new",
  });
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div>
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
        {isMyPlacesLoading && <div>로딩 중...</div>}
        {!isMyPlacesLoading && isMyPlacesError && (
          <div>오류: {myPlacesError.message}</div>
        )}
        {!isMyPlacesLoading && !isMyPlacesError && myPlaces.length === 0 && (
          <div>플레이스가 없습니다.</div>
        )}
        {!isMyPlacesLoading && !isMyPlacesError && myPlaces.length > 0 && (
          <div className="grid grid-cols-4 gap-12">
            {myPlaces.map((placeSummary) => (
              <PlaceCard key={placeSummary.uuid} place={placeSummary} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPlacePage;
