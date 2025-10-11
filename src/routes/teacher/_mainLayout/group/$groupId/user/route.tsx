import { createFileRoute } from "@tanstack/react-router";
import GroupUserPage from "src/domain/group/components/GroupUserPage";

export const Route = createFileRoute(
  "/teacher/_mainLayout/group/$groupId/user",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId } = Route.useParams();
  return <GroupUserPage id={groupId} />;
}
