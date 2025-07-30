import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tutorial")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Tutorial Page</div>;
}
