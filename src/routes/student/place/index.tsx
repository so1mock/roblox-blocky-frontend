import { createFileRoute } from "@tanstack/react-router";
import { verifyAuth } from "@user/utils/authGuard";

export const Route = createFileRoute("/student/place/")({
  beforeLoad: async () => {
    await verifyAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>My Place List 페이지</div>;
}
