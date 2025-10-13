import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout/resources")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Hello teacher/_mainLayout/resources</div>;
}
