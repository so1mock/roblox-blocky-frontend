import { createFileRoute, redirect } from "@tanstack/react-router";
import { getGroupInfo } from "src/domain/group/apis/group";
import GroupDetailedPage from "src/domain/group/components/GroupDetailedPage";
import type { Group } from "src/domain/group/types/group";

export const Route = createFileRoute("/teacher/_mainLayout/group/$groupId/")({
  loader: async ({ params }) => {
    try {
      const group: Group = await getGroupInfo(params.groupId);
      return group;
    } catch (error) {
      alert("유효하지 않은 반입니다.");
      throw redirect({ to: "/teacher/group" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  // const { groupId } = Route.useParams();
  const group = Route.useLoaderData();
  return <GroupDetailedPage group={group} />;
}
