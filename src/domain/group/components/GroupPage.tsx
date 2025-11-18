import { useState } from "react";
import { GroupCard } from "./GroupCard";
import Dropdown from "@common/components/Dropdown";
import { useAuthStore } from "@user/stores/authStore";
import { useMyGroupsQuery } from "../hooks/useMyGroupsQuery";
import { useCreateGroupMutation } from "../hooks/useCreateGroupMutation";
import { useJoinGroupMutation } from "../hooks/useJoinGroupMutation";
import AlertModal from "@common/components/AlertModal";
import { useAlertModal } from "@common/hooks/useAlertModal";

const sortOptions = [
  { name: "최신 순", key: "new" },
  { name: "과거 순", key: "old" },
];

function GroupPage() {
  const { userInfo } = useAuthStore();
  const { isOpen, config, showAlert, closeAlert } = useAlertModal();
  const [selectedSort, setSelectedSort] = useState({
    name: "최신 순",
    key: "new",
  });
  const {
    data: myGroups = [],
    isLoading: isMyGroupsLoading,
    isError: isMyGroupsError,
    error: myGroupsError,
  } = useMyGroupsQuery();
  const { mutateAsync: createGroupMutation, isPending: isCreatingGroup } =
    useCreateGroupMutation();
  const { mutateAsync: joinGroupMutation, isPending: isJoiningGroup } =
    useJoinGroupMutation();

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [newGroupDescription, setNewGroupDescription] = useState<string>("");
  const [isJoinOpen, setIsJoinOpen] = useState<boolean>(false);
  const [inviteCodeInput, setInviteCodeInput] = useState<string>("");

  const handleCreateGroup = async () => {
    if (isCreatingGroup || newGroupName.trim().length === 0) return;

    try {
      const groupInfo = {
        name: newGroupName.trim(),
        description: newGroupDescription.trim(),
      };

      await createGroupMutation(groupInfo);
      setIsCreateOpen(false);
      setNewGroupName("");
      setNewGroupDescription("");
    } catch (e) {
      showAlert({
        title: "그룹",
        message: "그룹생성에 실패했습니다.",
        type: "warning",
      });
    }
  };

  const handleJoinGroup = async () => {
    if (isJoiningGroup) return;

    try {
      await joinGroupMutation(inviteCodeInput.trim());
      setIsJoinOpen(false);
      setInviteCodeInput("");
    } catch (e) {
      showAlert({
        title: "그룹",
        message: "그룹가입에 실패했습니다.",
        type: "warning",
      });
    }
  };

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
      {isMyGroupsLoading && <div>로딩 중...</div>}
      {!isMyGroupsLoading && isMyGroupsError && (
        <div>오류: {myGroupsError.message}</div>
      )}
      {!isMyGroupsLoading && !isMyGroupsError && myGroups.length === 0 && (
        <div>그룹이 없습니다.</div>
      )}
      {!isMyGroupsLoading && !isMyGroupsError && myGroups.length > 0 && (
        <div className="grid grid-cols-4 gap-12">
          {myGroups.map((group) => (
            <GroupCard key={group.uuid} groupSummary={{ ...group }} />
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
                disabled={isCreatingGroup || newGroupName.trim().length === 0}
                onClick={handleCreateGroup}
              >
                {isCreatingGroup ? "생성 중..." : "생성"}
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
                disabled={isJoiningGroup || inviteCodeInput.trim().length === 0}
                onClick={handleJoinGroup}
              >
                {isJoiningGroup ? "가입 중..." : "가입"}
              </button>
            </div>
          </div>
        </div>
      )}
      <AlertModal
        isOpen={isOpen}
        onClose={closeAlert}
        title={config.title}
        message={config.message}
        type={config.type}
      />
    </div>
  );
}

export default GroupPage;
