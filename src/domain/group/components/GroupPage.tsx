import { useState } from "react";
import { GroupCard } from "./GroupCard";

const sortOptions = [
  { name: "최신 순", key: "new" },
  { name: "과거 순", key: "old" },
];
function GroupPage() {
  const [isSearchOptionsOpen, setIsSearchOptionsOpen] =
    useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState({
    name: "최신 순",
    key: "new",
  });
  return (
    <div>
      <div className="flex justify-between mb-12">
        <h1 className="text-left">
          <span className="text-3xl font-bold">반</span>
        </h1>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-rbPrimaryColor hover:bg-[#E9F6FF] font-medium transition-all shadow-sm cursor-pointer"
            onClick={() => {
              // to do
              // 새 그룹 만들고, 그룹 이름 및 설명 수정 페이지로 navigate
            }}
          >
            <img src="/infoIcon.png" alt="새 그룹 만들기" className="w-5 h-5" />
            <span className="font-bold text-rbPrimaryColor">새 반 만들기</span>
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
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-12">
        <GroupCard
          group={{
            id: "2",
            name: "반1",
            image: undefined,
          }}
        />
      </div>
    </div>
  );
}

export default GroupPage;
