import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";
import type { BoardSummary } from "../types/board";

function BoardListItem({
  groupUuid,
  boardSummary,
}: {
  groupUuid: string;
  boardSummary: BoardSummary;
}) {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();

  // params의 구조는 라우터 정의에 따라 다름
  // 예를 들어 route: /student/group/:groupId/board/:boardId

  return (
    <div className="whitespace-nowrap py-3 border-solid border-[#DEDEDE] border-b-2 bg-white">
      <div className="inline-block align-middle w-[900px] text-left pl-4 overflow-hidden truncate">
        <span
          className="text-md text-rbPointColor font-bold whitespace-nowrap cursor-pointer"
          title={boardSummary.title}
          onClick={() => {
            if (userInfo?.role === "EDUCATOR") {
              navigate({
                to: `/teacher/group/${groupUuid}/board/${boardSummary.boardUuid}`,
              });
            } else {
              navigate({
                to: `/student/group/${groupUuid}/board/${boardSummary.boardUuid}`,
              });
            }
          }}
        >
          {boardSummary.title}
        </span>
      </div>
      <div className="inline-block align-middle w-[200px] text-center overflow-hidden truncate">
        <span
          className="text-md text-[#888888] whitespace-nowrap"
          title={boardSummary.createdAt}
        >
          {new Date(boardSummary.createdAt)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\s/g, "")}
        </span>
      </div>
    </div>
  );
}

export default BoardListItem;
