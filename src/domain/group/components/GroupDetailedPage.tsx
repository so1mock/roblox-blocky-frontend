import { useEffect, useState } from "react";
import Board from "../board/components/Board";
import GroupWallItem from "../wall/components/GroupWallItem";
import GroupNav from "./GroupNav";
import { useAuthStore } from "@user/stores/authStore";
import GroupWallCreateForm from "../wall/components/GroupWallCreateForm";
import type { Group } from "../types/group";
import type { Wall } from "../wall/types/wall";
import { getGroupWalls } from "../wall/apis/wall";

function GroupDetailedPage({ group }: { group: Group }) {
  const [, setPage] = useState(1);
  const { userInfo } = useAuthStore();
  const [walls, setWalls] = useState<Wall[]>([]);
  const [wallsError, setWallsError] = useState<string | null>(null);
  const [wallsLoading, setWallsLoading] = useState<boolean>(false);

  const refreshWalls = async () => {
    setWallsLoading(true);
    setWallsError(null);
    try {
      const walls = await getGroupWalls(group.groupSummary.uuid);
      setWalls(walls);
    } catch (e) {
      if (e instanceof Error) {
        setWallsError(e.message ?? "담벼락 목록을 가져오지 못했습니다.");
      }
    } finally {
      setWallsLoading(false);
    }
  };

  useEffect(() => {
    refreshWalls();
  }, []);

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo?.role === "EDUCATOR" && (
        <GroupNav id={group.groupSummary.uuid} />
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
                  학생 {group.memberCount}명
                </span>
              </div>

              <h1 className="font-bold text-4xl">{group.groupSummary.name}</h1>
              <span>개설자: {group.ownerNickname}</span>
            </div>
          </div>
          <span>{group.groupSummary.description}</span>
        </div>
        <div className=" bg-white rounded-2xl px-12 py-12 mt-8">
          <Board
            setPage={setPage}
            pageInfo={{
              currentPageNumber: 3,
              possibleNextPageNumbers: [4, 5],
            }}
            groupId={group.groupSummary.uuid}
          />
          {/* 여기도 나중에 같은 수준으로 컴포넌트화하는 게 나을 듯?*/}
          <div>
            <span className="font-bold text-2xl">담벼락</span>
            {userInfo?.role === "LEARNER" && (
              <GroupWallCreateForm refreshWalls={refreshWalls} />
            )}

            {wallsLoading && <div>로딩 중...</div>}
            {!wallsLoading && wallsError && <div>오류: {wallsError}</div>}
            {!wallsLoading && !wallsError && walls.length === 0 && (
              <div>담벼락이 없습니다.</div>
            )}
            {!wallsLoading &&
              !wallsError &&
              walls.length > 0 &&
              walls.map((wall) => (
                <GroupWallItem key={wall.messageUuid} wall={wall} />
              ))}
            <GroupWallItem
              wall={{
                authorName: "namdarachi",
                authorUuid: "1",
                authorImage: undefined,
                messageUuid: "1",
                content: "재밌는 수업이었어요~",
                createdAt: "2025-10-10T09:30:00Z",
                updatedAt: "2025-10-10T09:30:00Z",
              }}
            />
            <GroupWallItem
              wall={{
                authorName: "gomdarachi",
                authorUuid: "2",
                authorImage: undefined,
                messageUuid: "2",
                content: "재밌는 수업이었다.",
                createdAt: "2025-10-10T09:30:00Z",
                updatedAt: "2025-10-10T09:30:00Z",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailedPage;
