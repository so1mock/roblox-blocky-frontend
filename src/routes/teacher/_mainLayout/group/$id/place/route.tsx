import { createFileRoute } from "@tanstack/react-router";
import GroupPlacePage from "src/domain/group/components/GroupPlacePage";

export const Route = createFileRoute("/teacher/_mainLayout/group/$id/place")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <GroupPlacePage id={id} />;
}
