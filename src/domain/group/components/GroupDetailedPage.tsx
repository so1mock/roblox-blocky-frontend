import { useEffect } from "react";
import Board from "../board/components/Board";
import Spinner from "@common/components/Spinner";
import Wall from "../wall/components/Wall";
import GroupNav from "./GroupNav";
import { useAuthStore } from "@user/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { useGroupDetailQuery } from "../hooks/useGroupDetailQuery";
import { useAlertModal } from "@common/hooks/useAlertModal";
import AlertModal from "@common/components/AlertModal";

function GroupDetailedPage({ groupUuid }: { groupUuid: string }) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  const { isOpen, config, showAlert, closeAlert } = useAlertModal();

  const {
    data: groupInfo,
    isLoading: isGroupInfoLoading,
    isError: isGroupInfoError,
    error: groupInfoError,
  } = useGroupDetailQuery(groupUuid);

  // 반 정보가 없으면 이 화면 자체가 성립하지 않는다.
  // 빈 화면을 남기는 대신 알린 뒤 목록으로 돌려보낸다.
  useEffect(() => {
    if (!isGroupInfoError) return;
    showAlert({
      title: "반 정보 불러오기 실패",
      message: groupInfoError.message,
      type: "error",
    });
    navigate({
      to: `/${userInfo?.role === "EDUCATOR" ? "teacher" : "student"}/group`,
    });
  }, [isGroupInfoError]);

  if (isGroupInfoError) return null;

  if (isGroupInfoLoading || groupInfo === undefined)
    return <Spinner label="반 정보를 불러오는 중..." />;

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo?.role === "EDUCATOR" && (
        <GroupNav id={groupInfo.groupSummary.uuid} />
      )}

      <div className="w-[1200px]">
        <div className="flex flex-col gap-6">
          <div className="flex gap-12 items-center">
            <img
              src={groupInfo.groupSummary.iconSrc}
              alt={groupInfo.groupSummary.name}
              className="w-[160px] h-full object-cover border-b-[2px] border-solid border-[#DDDDDD]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/imgProfile.png";
              }}
            />
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-white bg-rbPrimaryColor px-2 py-2 rounded-3xl">
                  학생 {groupInfo.memberCount}명
                </span>
              </div>

              <h1 className="font-bold text-4xl">
                {groupInfo.groupSummary.name}
              </h1>
              <span>개설자: {groupInfo.ownerNickname}</span>
            </div>
          </div>
          <span>{groupInfo.groupSummary.description}</span>
        </div>
        <div className=" bg-white rounded-2xl px-12 py-12 mt-8">
          <Board groupUuid={groupInfo.groupSummary.uuid} />
          <Wall groupUuid={groupInfo.groupSummary.uuid} />
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

export default GroupDetailedPage;
