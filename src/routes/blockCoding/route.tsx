import { createFileRoute } from "@tanstack/react-router";
import BlockCodingPage from "src/domain/project/components/BlockCodingPage";

export const Route = createFileRoute("/blockCoding")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BlockCodingPage />;
}
