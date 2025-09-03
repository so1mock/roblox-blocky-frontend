import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";
import { useEffect } from "react";
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
    const isLogin = useAuthStore((state) => state.isLogin);
    const navigate = useNavigate();

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
