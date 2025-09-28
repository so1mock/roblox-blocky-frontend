import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { refreshToken } from "@user/apis/user";
import { api } from "@common/apis/axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 실패 시 3번 재시도 (기본값)
    },
  },
});

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { isLogin, setAuth, clearAuth } = useAuthStore.getState();
    if (isLogin !== null) return;

    try {
      const response = await refreshToken();
      api.defaults.headers.common["Authorization"] =
        `Bearer ${response.auth.accessToken}`;
      setAuth(response.info);
    } catch (error) {
      clearAuth();
    }
  },
  component: () => {
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
