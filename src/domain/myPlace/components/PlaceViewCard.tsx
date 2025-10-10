import type { PlaceSummary } from "src/domain/place/types/place";
import { useNavigate } from "@tanstack/react-router";
import { formatIsoStringToDate } from "../../common/utils/formatIsoStringToDate";
import Button from "@common/components/Button";

interface PlaceViewCardProps {
  place: PlaceSummary;
}

export function PlaceViewCard({ place }: PlaceViewCardProps) {
  const navigate = useNavigate();

  const enterPlace = () => {
    navigate({ to: "/student/place/$id", params: { id: place.uuid } });
  };

  return (
    <div className="w-[300px] flex-shrink-0 border-[2px] border-solid border-[#DDDDDD] rounded-3xl shadow-lg">
      <div className="relative h-[150px]">
        <img
          src="/defaultPlaceThumbnail.png"
          className="w-full h-full object-cover border-b-[2px] border-solid border-[#DDDDDD]"
        />
      </div>
      <div className="bg-white rounded-b-3xl py-4 px-3">
        <div className="flex justify-between items-center w-full">
          <span className="font-bold text-md truncate block w-[calc(100%-90px)]">
            {place.name}
          </span>
          <Button handleButtonClick={enterPlace} text="입장" />
        </div>

        <span className="text-sm text-gray-400">
          {formatIsoStringToDate(place.lastModifiedAt)}
        </span>
      </div>
    </div>
  );
}
