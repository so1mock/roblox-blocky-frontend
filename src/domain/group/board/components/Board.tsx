import Pagination from "@common/components/Pagination";
import BoardListHeader from "./BoardListHeader";
import BoardListItem from "./BoardListItem";
import { useState } from "react";
import Button from "@common/components/Button";
import { useAuthStore } from "@user/stores/authStore";

function Board({ groupId }: { groupId: string }) {
  const { userInfo } = useAuthStore();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-2xl">게시판</span>
        {userInfo?.role === "EDUCATOR" && (
          <Button
            text="글 쓰기"
            handleButtonClick={() => {
              // to do
              // 글 쓰기 페이지로 이동
            }}
          />
        )}
      </div>

      <hr className="h-[2px] bg-black mt-3" />
      <BoardListHeader />
      <BoardListItem groupId={groupId} curPage={currentPageNumber} />
      <Pagination
        pageInfo={{
          currentPageNumber: currentPageNumber,
          visiblePagesCount: 5, // 정책에 따라서 변경 가능
          totalPages: 10, // api가 구현되면 응답 값으로 설정해야 하는 값
        }}
        setCurrentPage={setCurrentPageNumber}
      />
    </div>
  );
}

export default Board;
