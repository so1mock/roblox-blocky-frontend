import { createFileRoute } from "@tanstack/react-router";
import GroupUserPage from "src/domain/group/components/GroupUserPage";

export const Route = createFileRoute("/teacher/_mainLayout/group/$id/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <GroupUserPage id={id} />;
}
