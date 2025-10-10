import Pagination from "@common/components/Pagination";
import BoardListHeader from "./BoardListHeader";
import BoardListItem from "./BoardListItem";
import type { PageInfo } from "@common/types/page";
import type { SetStateAction } from "react";

function Board({
  pageInfo,
  setPage,
}: {
  pageInfo: PageInfo;
  setPage: React.Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="bg-white rounded-2xl mt-8 px-12 py-12">
      <span className="font-bold text-2xl">게시판</span>
      <hr className="h-[2px] bg-black mt-3" />
      <BoardListHeader />
      <BoardListItem />
      <Pagination pageInfo={pageInfo} setPage={setPage} />
    </div>
  );
}

export default Board;
