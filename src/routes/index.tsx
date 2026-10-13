import { createFileRoute, redirect } from "@tanstack/react-router";
import { SocialLoginButton } from "@user/components/SocialLoginButton";
import { useUser } from "@user/hooks/useUser";
import { useAuthStore } from "@user/stores/authStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import AlertModal from "@common/components/AlertModal";
import { useAlertModal } from "@common/hooks/useAlertModal";
import { ApiError } from "@common/apis/ApiError";
import { loginSchema, type LoginForm } from "@user/constants/schema";

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
  const { isOpen, config, showAlert, closeAlert } = useAlertModal();
  const [isTeacherLoginOpen, setTeacherLoginOpen] = useState(false);
  const { handleLogin } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const closeTeacherLogin = () => {
    setTeacherLoginOpen(false);
    reset();
  };

  // 입력 형식 검증은 zod 가 먼저 끝낸 뒤에만 이 함수가 호출된다
  const onSubmit = async (form: LoginForm) => {
    try {
      await handleLogin(form);
      const role = useAuthStore.getState().userInfo?.role;
      if (role === "EDUCATOR") {
        navigate({ to: "/teacher" });
      } else if (role === "LEARNER") {
        navigate({ to: "/student" });
      } else {
        showAlert({
          title: "사용자 정보 오류",
          message: "사용자 역할을 찾지 못했습니다. 메인 페이지로 이동합니다.",
          type: "error",
        });
      }
    } catch (error) {
      // 로그인 실패는 폼 에러이므로 토스트가 아니라 폼 안에 표시한다.
      // 서버가 준 문구를 그대로 쓴다 (예: M400 "올바르지 않은 아이디 혹은 비밀번호입니다.")
      setError("root", {
        message:
          error instanceof ApiError ? error.message : "로그인에 실패했습니다.",
      });
    }
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
      </div>
      {isTeacherLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              선생님 로그인
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  아이디
                </label>
                <input
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="아이디"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="비밀번호"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* 서버가 돌려준 로그인 실패 사유 */}
              {errors.root && (
                <p className="text-sm text-red-600">{errors.root.message}</p>
              )}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                  disabled={isSubmitting}
                  onClick={closeTeacherLogin}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <AlertModal
        isOpen={isOpen}
        onClose={closeAlert}
        title={config.title}
        message={config.message}
        type={config.type}
      />
    </div>
  );
}
