import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/_mainLayout/my-places")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/student/_mainLayout/myPlaces"!</div>;
}
