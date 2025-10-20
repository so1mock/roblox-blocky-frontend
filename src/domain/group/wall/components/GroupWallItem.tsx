import { formatIsoStringToDate } from "@common/utils/formatIsoStringToDate";
import GroupWallOptions from "./GroupWallOptions";
import { useState } from "react";
import type { WallInfo } from "../types/wall";
import { useAuthStore } from "@user/stores/authStore";

function GroupWallItem({
  wall,
  onChanged,
}: {
  wall: WallInfo;
  onChanged: () => void | Promise<void>;
}) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const { userInfo } = useAuthStore.getState();
  return (
    <div className="flex items-center relative py-6 gap-8 border-solid border-[#DEDEDE] border-b-2 bg-white">
      <div>
        {/* 아직 프로필 이미지가 구현돼있지 않음 */}
        <img
          src="/maskGroup1.png"
          alt="기본 프로필 이미지"
          className="rounded-full bg-[#E8F5FF]"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span>{wall.authorName}</span>
          <span>{wall.content}</span>
        </div>
        <span className="text-[#888888]">
          {formatIsoStringToDate(wall.createdAt)}
        </span>
      </div>
      {/* 옵션 버튼*/}
      {userInfo &&
        (userInfo.uuid === wall.authorUuid || userInfo.role === "EDUCATOR") && (
          <button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              setIsOptionOpen((prev) => !prev);
            }}
          >
            <img src="/moreOptionsHorizonButton.png" className="" />
          </button>
        )}
      {isOptionOpen && (
        <GroupWallOptions
          messageUuid={wall.messageUuid}
          onChanged={onChanged}
        />
      )}
    </div>
  );
}

export default GroupWallItem;
