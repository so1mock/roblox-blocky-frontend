import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my-places/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>My Place List 페이지</div>;
}
