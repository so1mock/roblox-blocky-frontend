import { Header } from "@common/components/header/Header";
import { createFileRoute } from "@tanstack/react-router";
import { verifyAuth } from "@user/utils/authGuard";
import { useEffect, useState } from "react";
import { getMyPlaces } from "src/domain/myPlaces/workspace/apis/workspace";
import type { PlaceSummary } from "src/domain/myPlaces/workspace/types/workspace";

export const Route = createFileRoute("/my-places/")({
  beforeLoad: async () => {
    await verifyAuth({ timeoutMs: 3000 });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [myPlaces, setMyPlaces] = useState<PlaceSummary[]>([]);

  useEffect(() => {
    const fetchMyPlaces = async () => {
      const response = await getMyPlaces();
      setMyPlaces(response);
    };
    fetchMyPlaces();
  }, []);
  return (
    <>
      <Header />
      <div>
        {myPlaces.map((placeSummary) => {
          return (
            <div>
              {placeSummary.uuid} <br />
              name: {placeSummary.name} <br />
              description: {placeSummary.description} <br />
              owner: {placeSummary.ownerName} <br />
              lastModified: {placeSummary.lastModifiedAt} <br />
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
