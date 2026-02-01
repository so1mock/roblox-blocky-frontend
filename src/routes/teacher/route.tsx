import { createFileRoute, Outlet } from "@tanstack/react-router";
import { verifyAuth } from "@user/utils/authGuard";

export const Route = createFileRoute("/teacher")({
  beforeLoad: () => {
    verifyAuth(["EDUCATOR"]);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
