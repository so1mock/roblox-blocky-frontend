import { api } from "@common/apis/axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { refreshToken } from "@user/apis/user";
import { useAuthStore } from "@user/stores/authStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 실패 시 3번 재시도 (기본값)
    },
  },
});

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { setAuth, clearAuth } = useAuthStore.getState();

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
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    );
  },
});
