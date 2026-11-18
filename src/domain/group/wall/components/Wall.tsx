import GroupWallCreateForm from "./GroupWallCreateForm";
import { useState } from "react";
import GroupWallItem from "./GroupWallItem";
import { useWallListQuery } from "../hooks/useWallListQuery";
import Pagination from "@common/components/Pagination";
import Spinner from "@common/components/Spinner";
import ErrorState from "@common/components/ErrorState";

function Wall({ groupUuid }: { groupUuid: string }) {
  const VISIBLE_PAGES_COUNT = 5; // 페이지 버튼 최대 개수
  const PAGE_SIZE = 5; // 페이지 당 담벼락 수
  const [page, setPage] = useState(1);

  const {
    data: walls,
    isLoading: isGroupWallLoading,
    isError: isGroupwallError,
    error: groupwallError,
    refetch: refetchWalls,
  } = useWallListQuery(groupUuid, page - 1, PAGE_SIZE);

  return (
    <div>
      <span className="font-bold text-2xl">담벼락</span>
      <GroupWallCreateForm groupUuid={groupUuid} />

      {isGroupWallLoading && (
        <Spinner label="담벼락을 불러오는 중..." size="sm" />
      )}

      {!isGroupWallLoading && isGroupwallError && (
        <ErrorState
          message={groupwallError.message}
          onRetry={() => refetchWalls()}
        />
      )}

      {walls !== undefined &&
        walls.wallMessages.map((wall) => (
          <GroupWallItem key={wall.uuid} wallInfo={wall} groupId={groupUuid} />
        ))}

      {walls !== undefined && walls.totalPages > 1 && (
        <Pagination
          setCurrentPage={setPage}
          pageInfo={{
            currentPageNumber: walls.currentPageNumber + 1,
            visiblePagesCount: VISIBLE_PAGES_COUNT,
            totalPages: walls.totalPages, // 백엔드 api가 수정되면 응답 값으로 수정
          }}
        />
      )}
    </div>
  );
}

export default Wall;
