import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_mainLayout/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Sign Up Page</div>;
}
