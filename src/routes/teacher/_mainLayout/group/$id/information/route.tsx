import { createFileRoute } from "@tanstack/react-router";
import GroupEditPage from "src/domain/group/components/GroupEditPage";

export const Route = createFileRoute(
  "/teacher/_mainLayout/group/$id/information",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <GroupEditPage id={id} />;
}
