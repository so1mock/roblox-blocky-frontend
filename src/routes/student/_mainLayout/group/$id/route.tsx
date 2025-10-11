import { createFileRoute } from "@tanstack/react-router";
import GroupDetailedPage from "src/domain/group/components/GroupDetailedPage";

export const Route = createFileRoute("/student/_mainLayout/group/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <GroupDetailedPage id={id} />;
}
