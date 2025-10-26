import GroupWallCreateForm from "./GroupWallCreateForm";
import { useState } from "react";
import GroupWallItem from "./GroupWallItem";
import { useWallListQuery } from "../hooks/useWallListQuery";
import Pagination from "@common/components/Pagination";

function Wall({ groupUuid }: { groupUuid: string }) {
  const [page, setPage] = useState(0);

  const {
    data: walls,
    isLoading: isGroupWallLoading,
    isError: isGroupwallError,
    error: groupwallError,
  } = useWallListQuery(groupUuid, page);

  return (
    <div>
      <span className="font-bold text-2xl">담벼락</span>
      <GroupWallCreateForm
        groupUuid={groupUuid}
        groupId={groupUuid}
        page={page}
      />

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

      {walls !== undefined && (
        <Pagination
          setPage={setPage}
          pageInfo={{
            currentPageNumber: walls.currentPageNumber,
            possibleNextPageNumbers: walls.possibleNextPageNumbers,
          }}
        />
      )}
    </div>
  );
}

export default Wall;
