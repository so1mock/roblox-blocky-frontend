import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">About Page</div>;
}
