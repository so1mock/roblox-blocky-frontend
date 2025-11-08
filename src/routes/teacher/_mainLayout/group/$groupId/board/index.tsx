import { createFileRoute } from "@tanstack/react-router";
import BoardCreatePage from "src/domain/group/board/components/BoardCreatePage";

export const Route = createFileRoute(
  "/teacher/_mainLayout/group/$groupId/board/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId } = Route.useParams();
  return <BoardCreatePage groupUuid={groupId} />;
}
