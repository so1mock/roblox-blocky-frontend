import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Hello teacher/_mainLayout/about</div>;
}
