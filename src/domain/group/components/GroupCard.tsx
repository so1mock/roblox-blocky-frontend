import { useNavigate } from "@tanstack/react-router";
import Button from "@common/components/Button";
import type { GroupSummary } from "../types/group";
import { useAuthStore } from "@user/stores/authStore";

interface EntryCardProps {
  group: GroupSummary;
}

export function GroupCard({ group }: EntryCardProps) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();

  const enterGroup = () => {
    if (userInfo?.role === "LEARNER") {
      navigate({
        to: "/student/group/$groupId",
        params: { groupId: group.groupUuid },
      });
    } else if (userInfo?.role === "EDUCATOR") {
      navigate({
        to: "/teacher/group/$groupId",
        params: { groupId: group.groupUuid },
      });
    } else {
      alert("역할 정보가 없습니다. 로그인을 해주십시요");
    }
  };

  return (
    <div className="w-[300px] border-[2px] border-solid border-[#DDDDDD] rounded-3xl shadow-lg overflow-hidden ">
      {group.image ? (
        <div className="relative h-[150px] ">
          <img
            src={group.image}
            className="w-full h-full object-cover border-b-[2px] border-solid border-[#DDDDDD]"
            alt={group.groupName}
          />
        </div>
      ) : (
        <div className="relative h-[150px]">
          <img
            src="/imageMode.png"
            className="absolute top-16 left-32 w-8 h-8"
            alt="mode"
          />
          <img
            src="/groupDeafultImage.png"
            className="w-full h-full object-cover border-b-[2px] border-solid border-[#DDDDDD]"
            alt={group.groupName}
          />
        </div>
      )}

      <div className="bg-white rounded-b-3xl py-4 px-3">
        <div className="flex justify-between items-center w-full">
          <span className="font-bold text-md truncate block w-[calc(100%-90px)]">
            {group.groupName}
          </span>

          <Button handleButtonClick={enterGroup} text="입장" />
        </div>
      </div>
    </div>
  );
}
