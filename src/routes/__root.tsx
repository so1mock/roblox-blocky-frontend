import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../common/components/header/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="bg-[#F5FAFF] flex-1 flex items-center justify-center">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </>
  ),
});
