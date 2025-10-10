import { useState } from "react";
import Board from "../board/components/Board";

function GroupDetailedPage({ id }: { id: string }) {
  console.log(id);
  const [, setPage] = useState(1);
  return (
    <div className="w-[1200px] mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <button className="cursor-pointer">
            <img src="/arrowLeftAlt.png" alt="반 개요 페이지로 가가" />
          </button>
        </div>

        <div className="flex gap-12">
          <img src="/imgProfile.png" alt="기본 반 이미지" />
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-white bg-rbPrimaryColor px-2 py-2 rounded-3xl">
                학생 12명
              </span>
            </div>

            <h1 className="font-bold text-4xl">연습 1반</h1>
            <span>개설자: 김선우</span>
          </div>
        </div>
        <span>이 반은 기초 로블록스 학습을 위해 생성된 반입니다.</span>
      </div>
      <Board
        setPage={setPage}
        pageInfo={{
          currentPageNumber: 3,
          possibleNextPageNumbers: [4, 5],
        }}
      />
    </div>
  );
}

export default GroupDetailedPage;
