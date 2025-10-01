import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout/group")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">About Page</div>;
}
