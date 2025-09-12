import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@user/guards/requireAuth";

export const Route = createFileRoute("/my-places/")({
  beforeLoad: async () => {
    await requireAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>My Place List 페이지</div>;
}
