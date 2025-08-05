import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../domain/common/components/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="bg-rbBg flex-1 flex items-center justify-center">
            <Outlet />
          </main>
          <TanStackRouterDevtools />
        </div>
      </QueryClientProvider>
    );
  },
});
