import { useState } from "react";
import Board from "../board/components/Board";
import GroupWallItem from "../wall/components/GroupWallItem";
import GroupNav from "./GroupNav";
import { useAuthStore } from "@user/stores/authStore";

function GroupDetailedPage({ id }: { id: string }) {
  const [, setPage] = useState(1);
  const { userInfo } = useAuthStore();

  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      {userInfo.role === "EDUCATOR" && <GroupNav id={id} />}

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
                  학생 12명
                </span>
              </div>

              <h1 className="font-bold text-4xl">연습 1반</h1>
              <span>개설자: 김선우</span>
            </div>
          </div>
          <span>이 반은 기초 로블록스 학습을 위해 생성된 반입니다.</span>
        </div>
        <div className=" bg-white rounded-2xl px-12 py-12 mt-8">
          <Board
            setPage={setPage}
            pageInfo={{
              currentPageNumber: 3,
              possibleNextPageNumbers: [4, 5],
            }}
          />
          <div>
            <span className="font-bold text-2xl">담벼락</span>
            <GroupWallItem index={0} />
            <GroupWallItem index={1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailedPage;
