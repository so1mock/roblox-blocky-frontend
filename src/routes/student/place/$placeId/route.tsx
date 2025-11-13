import { createFileRoute } from "@tanstack/react-router";
import BlockCodingPage from "@place/components/BlockCodingPage";

export const Route = createFileRoute("/student/place/$placeId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <BlockCodingPage id={id} />;
}
