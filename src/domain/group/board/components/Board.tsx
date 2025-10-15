import Pagination from "@common/components/Pagination";
import BoardListHeader from "./BoardListHeader";
import BoardListItem from "./BoardListItem";
import type { PageInfo } from "@common/types/page";
import type { SetStateAction } from "react";
import Button from "@common/components/Button";
import { useAuthStore } from "@user/stores/authStore";

function Board({
  pageInfo,
  setPage,
  groupId,
}: {
  pageInfo: PageInfo;
  setPage: React.Dispatch<SetStateAction<number>>;
  groupId: string;
}) {
  const { userInfo } = useAuthStore();
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
      <BoardListItem groupId={groupId} />
      <Pagination pageInfo={pageInfo} setPage={setPage} />
    </div>
  );
}

export default Board;
