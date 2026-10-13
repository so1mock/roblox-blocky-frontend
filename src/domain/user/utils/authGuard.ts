import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";
import type { UserRole } from "@user/types/user";

/*
로그인 상태이고 현재 사용자의 role이 requiredRoles에 포함되어 있다면 통과
빈 배열이어도 로그인 상태는 확인
*/
export const verifyAuth = (requiredRoles: UserRole[] = []) => {
  const { isLogin, userInfo } = useAuthStore.getState();
  if (!isLogin) {
    throw redirect({ to: "/", search: { redirect: window.location.pathname } });
  }

  if (requiredRoles.length === 0) return;

  if (userInfo && requiredRoles.includes(userInfo.role)) return;

  // 권한이 없으면 역할에 맞는 홈으로 돌려보낸다.
  // "/" 의 beforeLoad 가 역할(EDUCATOR/LEARNER)별로 다시 분기하므로
  // 여기서 목적지를 따로 계산하지 않는다.
  throw redirect({ to: "/" });
};
