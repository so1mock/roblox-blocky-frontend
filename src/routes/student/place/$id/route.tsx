import { createFileRoute } from "@tanstack/react-router";
import { verifyAuth } from "@user/utils/authGuard";
import BlockCodingPage from "src/domain/place/components/BlockCodingPage";

export const Route = createFileRoute("/student/place/$id")({
  beforeLoad: async () => {
    await verifyAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <BlockCodingPage id={id} />;
}
