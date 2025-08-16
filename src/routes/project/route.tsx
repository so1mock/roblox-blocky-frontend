import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/project")({
  component: RouteComponent,
});

function RouteComponent() {
  // 자식 라우트(ProjectPage)를 그대로 렌더
  return <Outlet />;
}
