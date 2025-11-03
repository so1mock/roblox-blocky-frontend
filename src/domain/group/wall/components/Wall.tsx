import GroupWallCreateForm from "./GroupWallCreateForm";
import { useState } from "react";
import GroupWallItem from "./GroupWallItem";
import { useWallListQuery } from "../hooks/useWallListQuery";
import Pagination from "@common/components/Pagination";

function Wall({ groupUuid }: { groupUuid: string }) {
  const [page, setPage] = useState(1);

  const {
    data: walls,
    isLoading: isGroupWallLoading,
    isError: isGroupwallError,
    error: groupwallError,
  } = useWallListQuery(groupUuid, page - 1, 4);

  return (
    <div>
      <span className="font-bold text-2xl">담벼락</span>
      <GroupWallCreateForm groupUuid={groupUuid} groupId={groupUuid} />

      {isGroupWallLoading && <div>로딩 중...</div>}

      {!isGroupWallLoading && isGroupwallError && (
        <div>오류: {groupwallError.message}</div>
      )}

      {walls !== undefined && walls.wallMessages.length === 0 && (
        <div>담벼락이 없습니다.</div>
      )}

      {walls !== undefined &&
        walls.wallMessages.map((wall) => (
          <GroupWallItem
            key={wall.uuid}
            wallInfo={wall}
            groupId={groupUuid}
            page={page}
          />
        ))}

      {walls !== undefined && walls.totalPages > 1 && (
        <Pagination
          setCurrentPage={setPage}
          pageInfo={{
            currentPageNumber: walls.currentPageNumber + 1,
            visiblePagesCount: 5,
            totalPages: walls.totalPages, // 백엔드 api가 수정되면 응답 값으로 수정
          }}
        />
      )}
    </div>
  );
}

export default Wall;
