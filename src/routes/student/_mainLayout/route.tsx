import Footer from "@common/components/Footer";
import { StudentHeader } from "@common/components/header/StudentHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/student/_mainLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#E8F5FF] bg-center bg-cover min-w-[1400px]">
      <StudentHeader />
      <main className="mb-[120px]">
        <Outlet />
      </main>
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
