import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import GroupDetailedPage from "src/domain/group/components/GroupDetailedPage";
import type { GroupInfo } from "src/domain/group/types/group";

export const Route = createFileRoute("/student/_mainLayout/group/$groupId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const groupInfo: GroupInfo = useLoaderData({
    from: "/student/_mainLayout/group/$groupId",
  });
  return <GroupDetailedPage groupInfo={groupInfo} />;
}
