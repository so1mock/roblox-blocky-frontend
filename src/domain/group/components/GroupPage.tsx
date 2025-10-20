import { useEffect, useState } from "react";
import { GroupCard } from "./GroupCard";
import Dropdown from "@common/components/Dropdown";
import { useAuthStore } from "@user/stores/authStore";
import {
  getMyGroups,
  createGroup,
  type CreateGroupRequest,
} from "../apis/group";
import type { GroupSummary } from "../types/group";
import { joinGroup } from "../user/apis/user";

const sortOptions = [
  { name: "최신 순", key: "new" },
  { name: "과거 순", key: "old" },
];
function GroupPage() {
  const [selectedSort, setSelectedSort] = useState({
    name: "최신 순",
    key: "new",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [myGroups, setMyGroups] = useState<GroupSummary[]>([]);
  const { userInfo } = useAuthStore();
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [newGroupDescription, setNewGroupDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isJoinOpen, setIsJoinOpen] = useState<boolean>(false);
  const [inviteCodeInput, setInviteCodeInput] = useState<string>("");
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyGroups();
      setMyGroups(response);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message ?? "그룹 목록을 가져오지 못했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-12">
        <h1 className="text-left">
          <span className="text-3xl font-bold">반</span>
        </h1>
        <div className="flex gap-4">
          {userInfo?.role === "EDUCATOR" && (
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-rbPrimaryColor hover:bg-[#E9F6FF] font-medium transition-all shadow-sm cursor-pointer"
              onClick={() => setIsCreateOpen(true)}
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

          {userInfo?.role === "LEARNER" && (
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-rbPrimaryColor hover:bg-[#E9F6FF] font-medium transition-all shadow-sm cursor-pointer"
              onClick={() => setIsJoinOpen(true)}
            >
              <img
                src="/infoIcon.png"
                alt="새 반 가입하기"
                className="w-5 h-5"
              />
              <span className="font-bold text-rbPrimaryColor">
                새 반 가입하기
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
      {isLoading && <div>로딩 중...</div>}
      {!isLoading && error && <div>오류: {error}</div>}
      {!isLoading && !error && myGroups.length === 0 && (
        <div>그룹이 없습니다.</div>
      )}
      {!isLoading && !error && myGroups.length > 0 && (
        <div className="grid grid-cols-4 gap-12">
          {myGroups.map((group) => (
            <GroupCard
              key={group.uuid}
              group={{ ...group, image: undefined }}
            />
          ))}
        </div>
      )}

      {/* 새 반 만들기 모달 */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
            <h2 className="text-xl font-bold mb-4">새 반 만들기</h2>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">이름</span>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                  placeholder="예: 3학년 2반"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">설명</span>
                <textarea
                  className="border border-gray-300 rounded-lg px-3 py-2 min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                  placeholder="그룹에 대한 간단한 설명을 적어주세요"
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  setIsCreateOpen(false);
                  setNewGroupName("");
                  setNewGroupDescription("");
                }}
              >
                취소
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-rbPrimaryColor text-white disabled:opacity-60"
                disabled={isCreating || newGroupName.trim().length === 0}
                onClick={async () => {
                  if (isCreating) return;
                  setIsCreating(true);
                  const groupInfo: CreateGroupRequest = {
                    name: newGroupName.trim(),
                    description: newGroupDescription.trim(),
                  };
                  try {
                    await createGroup(groupInfo);
                    setIsCreateOpen(false);
                    setNewGroupName("");
                    setNewGroupDescription("");
                    await refresh();
                  } catch (e) {
                    if (e instanceof Error) {
                      alert(e.message);
                    }
                  } finally {
                    setIsCreating(false);
                  }
                }}
              >
                {isCreating ? "생성 중..." : "생성"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 새 반 가입하기 모달 (학생용) */}
      {isJoinOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
            <h2 className="text-xl font-bold mb-4">새 반 가입하기</h2>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">초대 코드</span>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                  placeholder="예: RBX-XXXX-XXXX"
                  value={inviteCodeInput}
                  onChange={(e) => setInviteCodeInput(e.target.value)}
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  setIsJoinOpen(false);
                  setInviteCodeInput("");
                }}
              >
                취소
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-rbPrimaryColor text-white disabled:opacity-60"
                disabled={isJoining || inviteCodeInput.trim().length === 0}
                onClick={async () => {
                  if (isJoining) return;
                  setIsJoining(true);
                  try {
                    await joinGroup(inviteCodeInput.trim());
                    await refresh();
                    setIsJoinOpen(false);
                    setInviteCodeInput("");
                  } catch (e) {
                    if (e instanceof Error) {
                      alert(e.message);
                    }
                  } finally {
                    setIsJoining(false);
                  }
                }}
              >
                {isJoining ? "가입 중..." : "가입"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupPage;
