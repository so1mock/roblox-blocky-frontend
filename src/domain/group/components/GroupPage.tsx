import { useState } from "react";
import { GroupCard } from "./GroupCard";
import Dropdown from "@common/components/Dropdown";
import { useAuthStore } from "@user/stores/authStore";

const sortOptions = [
  { name: "최신 순", key: "new" },
  { name: "과거 순", key: "old" },
];
function GroupPage() {
  const [selectedSort, setSelectedSort] = useState({
    name: "최신 순",
    key: "new",
  });

  const { userInfo } = useAuthStore();

  return (
    <div className="w-[1600px]">
      <div className="flex justify-between mb-12">
        <h1 className="text-left">
          <span className="text-3xl font-bold">반</span>
        </h1>
        <div className="flex gap-4">
          {userInfo?.role === "EDUCATOR" && (
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-rbPrimaryColor hover:bg-[#E9F6FF] font-medium transition-all shadow-sm cursor-pointer"
              onClick={() => {
                // to do
                // 새 그룹 만들고, 그룹 이름 및 설명 수정 페이지로 navigate
              }}
            >
              <img
                src="/infoIcon.png"
                alt="새 그룹 만들기"
                className="w-5 h-5"
              />
              <span className="font-bold text-rbPrimaryColor">
                새 반 만들기
              </span>
            </button>
          )}

          <Dropdown
            options={sortOptions}
            selected={selectedSort}
            onChange={setSelectedSort}
            width="w-[200px]" // 옵션 (안 넣으면 기본 180px)
          />
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
