import { useState } from "react";
import UserListHeader from "./UserListHeader";
import UserListItem from "./UserListItem";
import Button from "@common/components/Button";
import { createInviteCode } from "../apis/user";
import { AxiosError } from "axios";
import { useGroupMemberListQuery } from "../hooks/useGroupMemberListQuery";

function UserBoard({ groupUuid }: { groupUuid: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingInviteCode, setIsCreatingInvideCode] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const { data: members } = useGroupMemberListQuery(groupUuid);

  const handleCreateInvite = async () => {
    if (isCreatingInviteCode) return;
    setIsCreatingInvideCode(true);
    try {
      const code = await createInviteCode(groupUuid);
      setInviteCode(code);
    } catch (e) {
      const message =
        e instanceof AxiosError ? e.response?.data.message : String(e);
      setInviteCode("초대 코드 생성 실패. " + message);
    } finally {
      setIsOpen(true);
      setIsCreatingInvideCode(false);
    }
  };

  return (
    <div className="inline-block mx-auto">
      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl">반 구성원 리스트</span>
        <Button
          text={isCreatingInviteCode ? "생성 중..." : "초대 코드 생성"}
          handleButtonClick={handleCreateInvite}
        />
      </div>

      <hr className="h-[2px] bg-black mt-3" />
      <UserListHeader />
      {members?.map((member) => {
        return (
          <UserListItem
            key={member.uuid}
            groupUuid={groupUuid}
            groupMember={member}
          />
        );
      })}

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
            <h2 className="text-xl font-bold mb-4">초대 코드</h2>
            <p className="text-sm text-gray-600 mb-2">
              아래 코드를 복사해 학생에게 전달하세요.
            </p>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                value={inviteCode ?? ""}
                readOnly
              />
              <button
                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  if (inviteCode) navigator.clipboard.writeText(inviteCode);
                }}
              >
                복사
              </button>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBoard;
