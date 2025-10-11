import { createFileRoute } from "@tanstack/react-router";
import GroupPlacePage from "src/domain/group/components/GroupPlacePage";

export const Route = createFileRoute(
  "/teacher/_mainLayout/group/$groupId/place",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId } = Route.useParams();
  return <GroupPlacePage id={groupId} />;
}
