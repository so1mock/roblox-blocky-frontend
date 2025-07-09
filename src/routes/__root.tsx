import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "../domain/common/components/header/Header";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="bg-rbBg flex-1 flex items-center justify-center">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </>
  ),
});
