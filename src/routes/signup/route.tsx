import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signUp")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Sign Up Page</div>;
}
