import Footer from "@common/components/Footer";
import { TeacherHeader } from "@common/components/header/TeacherHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[url(/mainBackground.png)] bg-center bg-cover">
      <TeacherHeader />
      <main>
        <Outlet />
      </main>
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
