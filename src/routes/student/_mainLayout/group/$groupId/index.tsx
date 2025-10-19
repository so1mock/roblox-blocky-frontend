import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import GroupDetailedPage from "src/domain/group/components/GroupDetailedPage";
import type { Group } from "src/domain/group/types/group";

export const Route = createFileRoute("/student/_mainLayout/group/$groupId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const group: Group = useLoaderData({
    from: "/student/_mainLayout/group/$groupId",
  });
  return <GroupDetailedPage group={group} />;
}
