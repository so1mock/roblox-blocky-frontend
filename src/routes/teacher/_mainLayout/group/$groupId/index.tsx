import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import GroupDetailedPage from "src/domain/group/components/GroupDetailedPage";

export const Route = createFileRoute("/teacher/_mainLayout/group/$groupId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const groupInfo = useLoaderData({
    from: "/teacher/_mainLayout/group/$groupId",
  });
  return <GroupDetailedPage groupInfo={groupInfo} />;
}
