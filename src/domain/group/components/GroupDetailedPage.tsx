import Board from "../board/components/Board";
import Wall from "../wall/components/Wall";
import GroupNav from "./GroupNav";
import { useAuthStore } from "@user/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { useGroupDetailQuery } from "../hooks/useGroupDetailQuery";

function GroupDetailedPage({ groupUuid }: { groupUuid: string }) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();

  const {
    data: groupInfo,
    isLoading: isGroupInfoLoading,
    isError: isGroupInfoError,
    error: groupInfoError,
  } = useGroupDetailQuery(groupUuid);

  if (isGroupInfoError) {
    alert("유효하지 않은 반입니다. " + groupInfoError.message);
    navigate({
      to: `/${userInfo?.role === "EDUCATOR" ? "teacher" : "student"}/group`,
    });
    return null;
  }

  if (isGroupInfoLoading || groupInfo === undefined)
    return <div>Loading...</div>;

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
          <Board groupId={groupInfo.groupSummary.uuid} />
          <Wall groupUuid={groupInfo.groupSummary.uuid} />
        </div>
      </div>
    </div>
  );
}

export default GroupDetailedPage;
