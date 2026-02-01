import type { PlaceSummary } from "src/domain/place/types/place";
import { formatIsoStringToDate } from "../../common/utils/formatIsoStringToDate";
import Button from "@common/components/Button";
import type { GroupMember } from "@group/user/types/user";

interface PlaceViewCardProps {
  placeSummary: PlaceSummary;
  student: GroupMember;
}

export function PlaceViewCard({ placeSummary, student }: PlaceViewCardProps) {
  const enterPlace = () => {
    const href = `/student/${student.uuid}/place/${placeSummary.uuid}`;
    window.location.href = href;
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
            {placeSummary.name}
          </span>
          <Button handleButtonClick={enterPlace} text="입장" />
        </div>

        <span className="text-sm text-gray-400">
          {formatIsoStringToDate(placeSummary.lastModifiedAt)}
        </span>
      </div>
    </div>
  );
}
