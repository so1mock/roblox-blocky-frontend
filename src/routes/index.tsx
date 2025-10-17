import { createFileRoute, redirect } from "@tanstack/react-router";
import { SocialLoginButton } from "@user/components/SocialLoginButton";
import { useUser } from "@user/hooks/useUser";
import { useAuthStore } from "@user/stores/authStore";
import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const role = useAuthStore.getState().userInfo?.role;
    if (role === "EDUCATOR") {
      throw redirect({ to: "/teacher" });
    } else if (role === "LEARNER") {
      throw redirect({ to: "/student" });
    }
  },
  component: Index,
});

function Index() {
  const [isTeacherLoginOpen, setTeacherLoginOpen] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [teacherPw, setTeacherPw] = useState("");
  const { handleLogin } = useUser();
  const navigate = useNavigate();

  const handleTeacherLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 교사용 로그인 API 호출 (teacherId, teacherPw 사용)
  };

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
          onClick={() => setTeacherLoginOpen(true)}
        >
          로그인
        </button>
      </div>

      {/* 오른쪽: 학생 */}
      <div className="flex-1 flex flex-col justify-center items-center bg-black/50 text-rbHoverText p-10">
        <h2 className="text-3xl font-bold mb-4">학생으로 시작하기</h2>
        <p className="mb-6 text-center">
          쉽고 재미있게 학습 자료를 이용하고, 학습 진도를 확인하며, 다양한 학습
          도구를 경험할 수 있습니다.
        </p>
        <SocialLoginButton />
        {/* <button
          className="px-6 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
          onClick={() => {
            navigate({ to: "/student" });
          }}
        >
          시작하기
        </button> */}
      </div>
      {isTeacherLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              선생님 로그인
            </h3>
            <form onSubmit={handleTeacherLogin} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  아이디
                </label>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  placeholder="아이디"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={teacherPw}
                  onChange={(e) => setTeacherPw(e.target.value)}
                  placeholder="비밀번호"
                />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                  onClick={() => setTeacherLoginOpen(false)}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={async () => {
                    try {
                      await handleLogin({
                        username: teacherId,
                        password: teacherPw,
                      });
                      const role = useAuthStore.getState().userInfo?.role;
                      if (role === "EDUCATOR") {
                        navigate({ to: "/teacher" });
                      } else if (role === "LEARNER") {
                        navigate({ to: "/student" });
                      } else {
                        alert(
                          "사용자 역할을 찾지 못했습니다. 메인 페이지로 이동합니다.",
                        );
                      }
                    } catch (error) {
                      throw error;
                    }
                  }}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
