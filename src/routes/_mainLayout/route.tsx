import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@common/components/header/Header";
import { verifyAuth } from "@user/utils/authGuard";

export const Route = createFileRoute("/_mainLayout")({
  beforeLoad: async () => {
    await verifyAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="bg-rbBg flex-1 flex items-center justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
}
