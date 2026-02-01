import { createFileRoute } from "@tanstack/react-router";
import BlockCodingPage from "@place/components/BlockCodingPage";

export const Route = createFileRoute("/student/place/$placeId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { placeId } = Route.useParams();
  return <BlockCodingPage placeId={placeId} />;
}
