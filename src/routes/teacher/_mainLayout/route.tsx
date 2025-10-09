import Footer from "@common/components/Footer";
import { TeacherHeader } from "@common/components/header/TeacherHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/teacher/_mainLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#E8F5FF] bg-center bg-cover min-w-[1400px]">
      <TeacherHeader />
      <main className="mb-[120px] px-36 mt-12">
        <Outlet />
      </main>
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
