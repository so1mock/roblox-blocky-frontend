import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMyPlaces } from "src/domain/myPlaces/workspace/apis/workspace";
import type { PlaceSummary } from "src/domain/myPlaces/workspace/types/workspace";

export const Route = createFileRoute("/student/_mainLayout/my-places")({
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
