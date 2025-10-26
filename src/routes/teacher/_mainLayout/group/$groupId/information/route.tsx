import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import GroupEditPage from "src/domain/group/components/GroupEditPage";
import type { GroupInfo } from "src/domain/group/types/group";

export const Route = createFileRoute(
  "/teacher/_mainLayout/group/$groupId/information",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const groupInfo: GroupInfo = useLoaderData({
    from: "/teacher/_mainLayout/group/$groupId",
  });
  return <GroupEditPage groupSummary={groupInfo.groupSummary} />;
}
