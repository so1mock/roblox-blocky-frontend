import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/$studentId/place/$placeId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/student/$studentId/place/$placeId"!</div>;
}
