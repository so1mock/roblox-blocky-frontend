import { createFileRoute } from "@tanstack/react-router";
import ProjectPage from "../../domain/project/ProjectPage";

export const Route = createFileRoute("/project")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProjectPage />;
}
