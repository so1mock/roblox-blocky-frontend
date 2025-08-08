import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 실패 시 3번 재시도 (기본값)
    },
  },
});

export const Route = createRootRoute({
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
