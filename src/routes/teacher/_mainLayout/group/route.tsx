import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout/group")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Hello teacher/_mainLayout/group</div>;
}
