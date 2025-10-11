import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/_mainLayout/course")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/student/_mainLayout/course"!</div>;
}
