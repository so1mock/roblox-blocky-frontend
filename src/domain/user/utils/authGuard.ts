import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";
import type { UserRole } from "@user/types/user";

/*
로그인 상태이고 현재 사용자의 role이 requiredRoles에 포함되어 있다면 통과
빈 배열이어도 로그인 상태는 확인
*/
export const verifyAuth = (requiredRoles: UserRole[] = []) => {
  const { isLogin, role } = useAuthStore.getState();
  if (!isLogin) {
    alert("로그인이 필요합니다");
    throw redirect({ to: "/", search: { redirect: window.location.pathname } });
  }

  if (requiredRoles.length === 0) return;

  if (role && requiredRoles.includes(role)) return;

  alert("접근 권한이 없습니다.");
  throw redirect({ to: "/", search: { redirect: window.location.pathname } });
};
