import { formatIsoStringToDate } from "@common/utils/formatIsoStringToDate";
import GroupWallOptions from "./GroupWallOptions";
import { useState } from "react";

function GroupWallItem({ index }: { index: number }) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  return (
    <div className="flex items-center relative py-6 gap-8 border-solid border-[#DEDEDE] border-b-2 bg-white">
      <div>
        {index % 2 === 0 ? (
          <img
            src="/maskGroup1.png"
            alt="기본 프로필 이미지"
            className="rounded-full bg-[#E8F5FF]"
          />
        ) : (
          <img
            src="/maskGroup2.png"
            alt="기본 프로필 이미지"
            className="rounded-full bg-[#E8F5FF]"
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span>namdarachi</span>
          <span>재밌는 수업이었다.</span>
        </div>
        <span className="text-[#888888]">
          {formatIsoStringToDate("2025-10-10T09:30:00Z")}
        </span>
      </div>
      <button
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => {
          setIsOptionOpen((prev) => !prev);
        }}
      >
        <img src="/moreOptionsHorizonButton.png" className="" />
      </button>
      {isOptionOpen && <GroupWallOptions />}
    </div>
  );
}

export default GroupWallItem;
