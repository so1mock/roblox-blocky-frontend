import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Log In Page</div>;
}
