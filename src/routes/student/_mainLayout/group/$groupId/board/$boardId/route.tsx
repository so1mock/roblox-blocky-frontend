import { createFileRoute } from "@tanstack/react-router";
import BoardDeatiledPage from "src/domain/group/board/components/BoardDeatiledPage";

export const Route = createFileRoute(
  "/student/_mainLayout/group/$groupId/board/$boardId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { groupId, boardId } = Route.useParams();
  return <BoardDeatiledPage groupId={groupId} boardId={boardId} />;
}
