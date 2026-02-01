import { useNavigate } from "@tanstack/react-router";
import Button from "@common/components/Button";
import type { GroupSummary } from "../types/group";
import { useAuthStore } from "@user/stores/authStore";
import { useAlertModal } from "@common/hooks/useAlertModal";
import AlertModal from "@common/components/AlertModal";

export function GroupCard({ groupSummary }: { groupSummary: GroupSummary }) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  const { isOpen, config, showAlert, closeAlert } = useAlertModal();

  const enterGroup = () => {
    if (userInfo?.role === "LEARNER") {
      navigate({
        to: "/student/group/$groupId",
        params: { groupId: groupSummary.uuid },
      });
    } else if (userInfo?.role === "EDUCATOR") {
      navigate({
        to: "/teacher/group/$groupId",
        params: { groupId: groupSummary.uuid },
      });
    } else {
      showAlert({
        title: "로그인",
        message: "역할 정보가 없습니다. 로그인을 해주십시요.",
        type: "error",
      });
    }
  };

  return (
    <div className="w-[300px] border-[2px] border-solid border-[#DDDDDD] rounded-3xl shadow-lg overflow-hidden ">
      <div className="relative h-[150px] ">
        <img
          src={groupSummary.iconSrc}
          className="w-full h-full object-cover border-b-[2px] border-solid border-[#DDDDDD]"
          alt={groupSummary.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/groupDeafultImage.png";
          }}
        />
      </div>
      <div className="bg-white rounded-b-3xl py-4 px-3">
        <div className="flex justify-between items-center w-full">
          <span className="font-bold text-md truncate block w-[calc(100%-90px)]">
            {groupSummary.name}
          </span>

          <Button handleButtonClick={enterGroup} text="입장" />
        </div>
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
