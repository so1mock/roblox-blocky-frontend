import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@common/apis/ApiError";
import {
  createGroupSchema,
  joinGroupSchema,
  type CreateGroupForm,
  type JoinGroupForm,
} from "../constants/schema";
import Spinner from "@common/components/Spinner";
import ErrorState from "@common/components/ErrorState";
import { GroupCard } from "./GroupCard";
import Dropdown from "@common/components/Dropdown";
import { useAuthStore } from "@user/stores/authStore";
import { useMyGroupsQuery } from "../hooks/useMyGroupsQuery";
import { useCreateGroupMutation } from "../hooks/useCreateGroupMutation";
import { useJoinGroupMutation } from "../hooks/useJoinGroupMutation";

const sortOptions = [
  { name: "최신 순", key: "new" },
  { name: "과거 순", key: "old" },
];

function GroupPage() {
  const { userInfo } = useAuthStore();
  const [selectedSort, setSelectedSort] = useState({
    name: "최신 순",
    key: "new",
  });
  const {
    data: myGroups = [],
    isLoading: isMyGroupsLoading,
    isError: isMyGroupsError,
    error: myGroupsError,
    refetch: refetchMyGroups,
  } = useMyGroupsQuery();
  const { mutateAsync: createGroupMutation } = useCreateGroupMutation();
  const { mutateAsync: joinGroupMutation } = useJoinGroupMutation();

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isJoinOpen, setIsJoinOpen] = useState<boolean>(false);

  const createForm = useForm<CreateGroupForm>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: { name: "", description: "" },
  });
  const joinForm = useForm<JoinGroupForm>({
    resolver: zodResolver(joinGroupSchema),
    defaultValues: { inviteCode: "" },
  });

  const closeCreate = () => {
    setIsCreateOpen(false);
    createForm.reset();
  };
  const closeJoin = () => {
    setIsJoinOpen(false);
    joinForm.reset();
  };

  const handleCreateGroup = async (form: CreateGroupForm) => {
    try {
      await createGroupMutation(form);
      closeCreate();
    } catch (error) {
      createForm.setError("root", {
        message:
          error instanceof ApiError ? error.message : "반 생성에 실패했습니다.",
      });
    }
  };

  const handleJoinGroup = async ({ inviteCode }: JoinGroupForm) => {
    try {
      await joinGroupMutation(inviteCode);
      closeJoin();
    } catch (error) {
      joinForm.setError("root", {
        message:
          error instanceof ApiError ? error.message : "반 가입에 실패했습니다.",
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
      {isMyGroupsLoading && <Spinner label="반 목록을 불러오는 중..." />}
      {!isMyGroupsLoading && isMyGroupsError && (
        <ErrorState
          message={myGroupsError.message}
          onRetry={() => refetchMyGroups()}
        />
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
            <form onSubmit={createForm.handleSubmit(handleCreateGroup)}>
              <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">이름</span>
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                    placeholder="예: 3학년 2반"
                    {...createForm.register("name")}
                  />
                  {createForm.formState.errors.name && (
                    <span className="text-sm text-red-600">
                      {createForm.formState.errors.name.message}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">설명</span>
                  <textarea
                    className="border border-gray-300 rounded-lg px-3 py-2 min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                    placeholder="그룹에 대한 간단한 설명을 적어주세요"
                    {...createForm.register("description")}
                  />
                </label>
              </div>

              {createForm.formState.errors.root && (
                <p className="mt-3 text-sm text-red-600">
                  {createForm.formState.errors.root.message}
                </p>
              )}

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  onClick={closeCreate}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rbPrimaryColor text-white disabled:opacity-60"
                  disabled={createForm.formState.isSubmitting}
                >
                  {createForm.formState.isSubmitting ? "생성 중..." : "생성"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 새 반 가입하기 모달 (학생용) */}
      {isJoinOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
            <h2 className="text-xl font-bold mb-4">새 반 가입하기</h2>
            <form onSubmit={joinForm.handleSubmit(handleJoinGroup)}>
              <div className="flex flex-col gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-sm font-medium">초대 코드</span>
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rbPrimaryColor"
                    placeholder="예: RBX-XXXX-XXXX"
                    {...joinForm.register("inviteCode")}
                  />
                  {joinForm.formState.errors.inviteCode && (
                    <span className="text-sm text-red-600">
                      {joinForm.formState.errors.inviteCode.message}
                    </span>
                  )}
                </label>
              </div>

              {joinForm.formState.errors.root && (
                <p className="mt-3 text-sm text-red-600">
                  {joinForm.formState.errors.root.message}
                </p>
              )}

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  onClick={closeJoin}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rbPrimaryColor text-white disabled:opacity-60"
                  disabled={joinForm.formState.isSubmitting}
                >
                  {joinForm.formState.isSubmitting ? "가입 중..." : "가입"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupPage;
