import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getGroupInfo } from "src/domain/group/apis/group";
import type { GroupInfo } from "src/domain/group/types/group";

export const Route = createFileRoute("/student/_mainLayout/group/$groupId")({
  loader: async ({ params }) => {
    try {
      const group: GroupInfo = await getGroupInfo(params.groupId);
      return group;
    } catch (error) {
      alert("유효하지 않은 반입니다.");
      throw redirect({ to: "/student/group" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
