import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUserInfo } from "../domain/user/apis/user";
import { useAuthStore } from "../domain/user/stores/authStore";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const navigate = useNavigate();

    const { isLogin } = useAuthStore();

    // App 초기 진입 시
    useEffect(() => {
      getUserInfo()
        .then((user) => setAuth(user))
        .catch(() => clearAuth());
    }, []);

    // App 초기 진입 시
    useEffect(() => {
      if (!isLogin) {
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
