import { createFileRoute } from "@tanstack/react-router";
import BlockCodingPage from "src/domain/myPlaces/components/BlockCodingPage";

export const Route = createFileRoute("/student/place/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <BlockCodingPage id={id} />;
}
