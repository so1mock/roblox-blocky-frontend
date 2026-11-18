import { useDeleteGroupMemberMutation } from "../hooks/useDeleteGroupMemberMutation";
import type { GroupMember } from "../types/user";
import { useAlertModal } from "@common/hooks/useAlertModal";
import AlertModal from "@common/components/AlertModal";
import { ApiError } from "@common/apis/ApiError";

function UserListItem({
  groupUuid,
  groupMember,
}: {
  groupUuid: string;
  groupMember: GroupMember;
}) {
  const { mutateAsync: deleteGroupMember } =
    useDeleteGroupMemberMutation(groupUuid);
  const { isOpen, config, showAlert, closeAlert } = useAlertModal();

  const handleUserRemove = async () => {
    try {
      await deleteGroupMember(groupMember.uuid);
    } catch (error) {
      showAlert({
        title: "멤버 제거 실패",
        message:
          error instanceof ApiError
            ? error.message
            : "멤버를 제거하지 못했습니다.",
        type: "error",
      });
    }
  };

  return (
    <div className="whitespace-nowrap py-3 border-solid border-[#DEDEDE] border-b-2 bg-white">
      <div className="inline-block align-middle w-[300px] text-center pl-4 overflow-hidden truncate">
        <span
          className="text-md text-black font-bold whitespace-nowrap"
          title={groupMember.nickname}
        >
          {groupMember.nickname}
        </span>
      </div>
      {/* <div className="inline-block align-middle w-[300px] text-center overflow-hidden truncate">
        <span
          className="text-md text-[#888888] whitespace-nowrap"
          title={"2025-10-10T09:30:00Z"}
        >
          {new Date("2025-10-10T09:30:00Z")
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\s/g, "")}
        </span>
      </div> */}
      <div className="inline-block align-middle w-[300px] text-center overflow-hidden truncate">
        <span
          className="text-md text-black whitespace-nowrap"
          title={groupMember.role}
        >
          {groupMember.role === "OWNER" ? "교사" : "학생"}
        </span>
      </div>
      <div className="inline-block align-middle w-[300px] overflow-hidden truncate text-center">
        {groupMember.role === "MEMBER" && (
          <button
            type="button"
            onClick={handleUserRemove}
            className="bg-white rounded-2xl px-4 py-1 cursor-pointer border-solid border-1 border-rbPointColor "
          >
            <span className="text-rbPointColor ">탈퇴</span>
          </button>
        )}
      </div>
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

export default UserListItem;
