import Pagination from "@common/components/Pagination";
import BoardListHeader from "./BoardListHeader";
import BoardListItem from "./BoardListItem";
import { useState } from "react";
import Button from "@common/components/Button";
import { useAuthStore } from "@user/stores/authStore";
import { useNavigate } from "@tanstack/react-router";
import { useGroupBoardsQuery } from "../hooks/useGroupBoardsQuery";
import type { BoardSummary } from "../types/board";

function Board({ groupUuid }: { groupUuid: string }) {
  const VISIBLE_PAGES_COOUNT = 5;
  const PAGE_SIZE = 5;
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const { data: boards } = useGroupBoardsQuery(
    groupUuid,
    currentPageNumber - 1,
    PAGE_SIZE,
  );
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl">게시판</span>
        {userInfo?.role === "EDUCATOR" && (
          <Button
            text="글 쓰기"
            handleButtonClick={() => {
              navigate({ to: `/teacher/group/${groupUuid}/board/write` });
            }}
          />
        )}
      </div>

      <hr className="h-[2px] bg-black mt-3" />
      {boards !== undefined && <BoardListHeader />}

      {boards !== undefined && boards.boards.length === 0 && (
        <div className="py-10 text-center text-gray-500">게시글이 없습니다</div>
      )}

      {boards?.boards.map((boardSummary: BoardSummary) => {
        return (
          <BoardListItem
            key={boardSummary.boardUuid}
            groupUuid={groupUuid}
            boardSummary={boardSummary}
          />
        );
      })}
      {/* <BoardListItem groupUuid={groupUuid} curPage={currentPageNumber} />
      <BoardListItem groupUuid={groupUuid} curPage={currentPageNumber} /> */}
      {boards !== undefined && (
        <Pagination
          pageInfo={{
            currentPageNumber: boards.currentPageNumber + 1,
            visiblePagesCount: VISIBLE_PAGES_COOUNT, // 정책에 따라서 변경 가능
            totalPages: boards.totalPages, // api가 구현되면 응답 값으로 설정해야 하는 값
          }}
          setCurrentPage={setCurrentPageNumber}
        />
      )}
    </div>
  );
}

export default Board;
