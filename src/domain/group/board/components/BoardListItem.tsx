import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";
import { Route as BoardRoute } from "src/routes/student/_mainLayout/group/$groupId/index"; // Route 객체 import

function BoardListItem() {
  const navigate = useNavigate();
  const { groupId } = BoardRoute.useParams(); // 현재 그룹 ID
  const boardId = 1; // api 연결 전 임시 id
  const { userInfo } = useAuthStore();

  // params의 구조는 라우터 정의에 따라 다름
  // 예를 들어 route: /student/group/:groupId/board/:boardId

  return (
    <div className="whitespace-nowrap py-3 border-solid border-[#DEDEDE] border-b-2 bg-white">
      <div className="inline-block align-middle w-[900px] text-left pl-4 overflow-hidden truncate">
        <span
          className="text-md text-rbPointColor font-bold whitespace-nowrap cursor-pointer"
          title="잼민이는 못 깨는 타워 따라 만들기"
          onClick={() => {
            // to do
            // 게시판 상세 페이지로 이동
            if (userInfo?.role === "EDUCATOR") {
              navigate({ to: `/teacher/group/${groupId}/board/${boardId}` });
            } else {
              navigate({ to: `/student/group/${groupId}/board/${boardId}` });
            }
          }}
        >
          잼민이는 못 깨는 타워 따라 만들기
        </span>
      </div>
      <div className="inline-block align-middle w-[200px] text-center overflow-hidden truncate">
        <span
          className="text-md text-[#888888] whitespace-nowrap"
          title={"2025-10-10T09:30:00Z"}
        >
          {new Date("2025-10-10T09:30:00Z")
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
