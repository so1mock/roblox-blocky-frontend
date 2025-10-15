import { createFileRoute } from "@tanstack/react-router";
import GroupPage from "src/domain/group/components/GroupPage";

export const Route = createFileRoute("/teacher/_mainLayout/group/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GroupPage />;
}
