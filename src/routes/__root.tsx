import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../shared/components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="min-w-[1024px]">
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
