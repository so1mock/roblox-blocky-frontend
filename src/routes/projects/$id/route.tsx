import { createFileRoute } from "@tanstack/react-router";
import BlockCodingPage from "src/domain/project/components/BlockCodingPage";

export const Route = createFileRoute("/projects/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <BlockCodingPage id={id} />;
}
