import { TeacherHeader } from "@common/components/header/TeacherHeader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[url(/mainBackground.png)] bg-center bg-cover">
      <TeacherHeader />
      <main>메인페이지</main>
      {/* 푸터 */}
    </div>
  );
}
