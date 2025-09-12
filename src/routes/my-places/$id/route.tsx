import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@user/guards/requireAuth";
import BlockCodingPage from "src/domain/myPlaces/components/BlockCodingPage";

export const Route = createFileRoute("/my-places/$id")({
  beforeLoad: async () => {
    await requireAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <BlockCodingPage id={id} />;
}
