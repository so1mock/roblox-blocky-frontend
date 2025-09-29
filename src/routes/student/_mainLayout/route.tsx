import Footer from "@common/components/Footer";
import { StudentHeader } from "@common/components/header/StudentHeader";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/student/_mainLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[url(/mainBackground.png)] bg-center bg-cover">
      <StudentHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
