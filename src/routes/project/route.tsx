import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@user/guards/requireAuth";

export const Route = createFileRoute("/project")({
  beforeLoad: async () => {
    await requireAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-rbText">Project Page</div>;
}
