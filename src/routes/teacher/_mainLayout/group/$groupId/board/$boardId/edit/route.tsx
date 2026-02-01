import { createFileRoute } from "@tanstack/react-router";
import BoardEditPage from "src/domain/group/board/components/BoardEditPage";

export const Route = createFileRoute(
  "/teacher/_mainLayout/group/$groupId/board/$boardId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId, boardId } = Route.useParams();
  return <BoardEditPage groupUuid={groupId} boardUuid={boardId} />;
}
