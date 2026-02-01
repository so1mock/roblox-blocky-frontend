import { createFileRoute } from "@tanstack/react-router";
import BoardDetailedPage from "src/domain/group/board/components/BoardDetailedPage";

export const Route = createFileRoute(
  "/teacher/_mainLayout/group/$groupId/board/$boardId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId, boardId } = Route.useParams();
  return <BoardDetailedPage groupUuid={groupId} boardUuid={boardId} />;
}
