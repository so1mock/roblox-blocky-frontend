import { createFileRoute } from "@tanstack/react-router";
import GroupDetailedPage from "src/domain/group/components/GroupDetailedPage";

export const Route = createFileRoute("/student/_mainLayout/group/$groupId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId } = Route.useParams();
  return <GroupDetailedPage id={groupId} />;
}
