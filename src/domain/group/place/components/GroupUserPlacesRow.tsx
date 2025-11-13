import type { GroupMemberPlaces } from "../types/place";
import { PlaceViewCard } from "@myPlace/components/PlaceViewCard";

export function GroupUserPlacesRow({
  groupMemberPlaces,
}: {
  groupMemberPlaces: GroupMemberPlaces;
}) {
  const { member, places } = groupMemberPlaces;
  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">{member.nickname}</h2>
      <div className="flex gap-4 p-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {places.places.length === 0 ? (
          <div className="text-gray-500">
            <span>등록된 플레이스가 없습니다.</span>
          </div>
        ) : (
          places.places.map((placeSummary) => (
            <div key={placeSummary.uuid} className="flex-shrink-0">
              <PlaceViewCard placeSummary={placeSummary} student={member} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
