import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-[url(/mainBackground.png)] bg-center bg-cover">
      {/* 왼쪽: 선생님 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-black/50 text-rbHoverText p-10">
        <h2 className="text-3xl font-bold mb-4">선생님으로 시작하기</h2>
        <p className="mb-6 text-center">
          학생들에게 학습 자료를 제공하고, 학습 상황을 관리하며, 학습 서비스를
          쉽게 운영할 수 있습니다.
        </p>
        <button
          className="px-6 py-3 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer"
          onClick={() => {
            navigate({ to: "/teacher" });
          }}
        >
          시작하기
        </button>
      </div>

      {/* 오른쪽: 학생 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-black/50 text-rbHoverText p-10">
        <h2 className="text-3xl font-bold mb-4">학생으로 시작하기</h2>
        <p className="mb-6 text-center">
          쉽고 재미있게 학습 자료를 이용하고, 학습 진도를 확인하며, 다양한 학습
          도구를 경험할 수 있습니다.
        </p>
        <button
          className="px-6 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
          onClick={() => {
            navigate({ to: "/student" });
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
