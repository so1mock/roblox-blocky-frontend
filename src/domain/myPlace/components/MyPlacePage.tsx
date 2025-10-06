import { useEffect, useState } from "react";
import { PlaceCard } from "./PlaceCard";
import { getMyPlaces } from "../apis/place";
import type { PlaceSummary } from "src/domain/place/types/place";

const sortOptions = [
  { name: "최신 순", key: "new" },
  { name: "과거 순", key: "old" },
];
function MyPlacePage() {
  const [myPlaces, setMyPlaces] = useState<PlaceSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOptionsOpen, setIsSearchOptionsOpen] =
    useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState({
    name: "최신 순",
    key: "new",
  });

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
    <div className="w-[1400px] mx-auto mt-12">
      <div>
        <div className="flex justify-between mb-12">
          <h1 className="text-left">
            <span className="text-3xl font-bold">마이 플레이스</span>
          </h1>
          <div className="flex gap-4">
            {/* ℹ️ 안내 버튼 */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#61C1FD] hover:bg-[#E9F6FF] font-medium transition-all shadow-sm cursor-pointer">
              <img
                src="/infoIcon.png"
                alt="새 플레이스 연결"
                className="w-5 h-5"
              />
              <span className="font-bold text-[#61C1FD] ">
                새 플레이스 연결
              </span>
            </button>
            <div className="relative w-[180px]">
              {/* 선택된 옵션 버튼 */}
              <button
                className="w-full px-4 py-3 bg-white rounded-2xl cursor-pointer flex justify-between items-center"
                onClick={() => setIsSearchOptionsOpen((prev) => !prev)}
              >
                <span>{selectedSort.name}</span>
                <div>
                  <img
                    src="/dropdown.png"
                    className={`w-4 transform transition-transform duration-200 ${
                      isSearchOptionsOpen ? "-rotate-90" : "rotate-0"
                    }`}
                  />
                </div>
              </button>

              {/* 옵션 메뉴 */}
              {isSearchOptionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl border border-gray-300 shadow-lg z-10">
                  {sortOptions
                    .filter((option) => option.key !== selectedSort.key)
                    .map((option, idx, arr) => (
                      <button
                        key={option.key}
                        className={`
              w-full px-4 py-3 text-left cursor-pointer flex justify-between items-center
              hover:bg-gray-100
              ${idx === 0 ? "rounded-t-2xl" : ""}
              ${idx === arr.length - 1 ? "rounded-b-2xl" : ""}
            `}
                        onClick={() => {
                          setSelectedSort(option);
                          setIsSearchOptionsOpen(false);
                        }}
                      >
                        <span>{option.name}</span>
                        <div>
                          <img src="/dropdown.png" className="w-4" />
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>
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
