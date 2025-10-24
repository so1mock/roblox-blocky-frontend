import { createFileRoute } from "@tanstack/react-router";
import GroupEditPage from "src/domain/group/components/GroupEditPage";

export const Route = createFileRoute(
  "/teacher/_mainLayout/group/$groupId/information",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId } = Route.useParams();
  return <GroupEditPage uuid={groupId} />;
}
