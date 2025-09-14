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

    // App 초기 진입 시
    useEffect(() => {
      getUserInfo()
        .then((user) => setAuth(user))
        .catch(() => clearAuth());
    }, []);

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
