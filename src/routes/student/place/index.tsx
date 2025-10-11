import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/place/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>place id가 있어야 합니다.</div>;
}
