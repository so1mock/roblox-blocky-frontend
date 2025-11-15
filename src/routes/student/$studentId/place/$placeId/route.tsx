import BlockCodingPage from "@place/components/BlockCodingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/$studentId/place/$placeId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { studentId, placeId } = Route.useParams();
  return (
    <BlockCodingPage placeId={placeId} studentId={studentId} readOnly={true} />
  );
}
