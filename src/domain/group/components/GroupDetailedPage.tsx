import { useState } from "react";
import Board from "../board/components/Board";
import Wall from "../wall/components/Wall";
import GroupNav from "./GroupNav";
import { useAuthStore } from "@user/stores/authStore";
import type { GroupInfo } from "../types/group";

function GroupDetailedPage({ groupInfo }: { groupInfo: GroupInfo }) {
  const [, setPage] = useState(1);
  const { userInfo } = useAuthStore();

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo?.role === "EDUCATOR" && (
        <GroupNav id={groupInfo.groupSummary.uuid} />
      )}

      <div className="w-[1200px]">
        <div className="flex flex-col gap-6">
          <div className="flex gap-12 items-center">
            <img
              src="/imgProfile.png"
              alt="기본 반 이미지"
              className="w-32 h-32 object-cover rounded-2xl"
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
          <Board
            setPage={setPage}
            pageInfo={{
              currentPageNumber: 3,
              possibleNextPageNumbers: [4, 5],
            }}
            groupId={groupInfo.groupSummary.uuid}
          />
          <Wall groupUuid={groupInfo.groupSummary.uuid} />
        </div>
      </div>
    </div>
  );
}

export default GroupDetailedPage;
