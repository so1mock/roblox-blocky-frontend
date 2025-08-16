import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@common/components/header/Header";
import { PlaceList } from "@place/components/PlaceList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PlaceList />
      </main>
    </div>
  );
}
