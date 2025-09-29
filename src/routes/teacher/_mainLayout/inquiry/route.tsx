import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout/inquiry")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Tutorial Page</div>;
}
