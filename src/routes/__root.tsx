import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";
import { useEffect } from "react";
import { getUserInfo } from "@user/apis/user";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 실패 시 3번 재시도 (기본값)
    },
  },
});

export const Route = createRootRoute({
  component: () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const navigate = useNavigate();

    const { isLogin, accessToken } = useAuthStore();

    // App 초기 진입 시 - 토큰이 있을 때만 사용자 정보 가져오기
    useEffect(() => {
      if (accessToken) {
        getUserInfo()
          .then((user) => setAuth(user, { accessToken }))
          .catch(() => clearAuth());
      } else {
        clearAuth();
      }
    }, []);

    // App 초기 진입 시
    useEffect(() => {
      if (isLogin === false) {
        navigate({ to: "/" });
      }
    }, [isLogin]);
    
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col">
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </QueryClientProvider>
    );
  },
});
