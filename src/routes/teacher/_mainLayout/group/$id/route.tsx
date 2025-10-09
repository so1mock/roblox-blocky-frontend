import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout/group/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/teacher/_mainLayout/group/$id"!</div>;
}
