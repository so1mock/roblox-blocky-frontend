import { createFileRoute } from "@tanstack/react-router";
import MyPlacePage from "src/domain/myPlace/components/MyPlacePage";

export const Route = createFileRoute("/student/_mainLayout/my-places")({
  component: RouteComponent,
});
123;

function RouteComponent() {
  return <MyPlacePage />;
}
