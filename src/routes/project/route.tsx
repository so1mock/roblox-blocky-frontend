import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Project Page</div>;
}
