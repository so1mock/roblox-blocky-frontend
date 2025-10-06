import { useState } from "react";
import type { PlaceSummary } from "src/domain/place/types/place";
import { useNavigate } from "@tanstack/react-router";
import { updatePlace, deletePlace } from "../apis/place";
import { PlaceEditingOption } from "./PlaceEditingOption";
import { formatIsoStringToDate } from "../../common/utils/formatIsoStringToDate";

interface PlaceCardProps {
  place: PlaceSummary;
  onChanged?: () => Promise<void> | void; // 변경 후 상위에서 재조회 용도
}

export function PlaceCard({ place, onChanged }: PlaceCardProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [editedPlaceName, setEditedPlaceName] = useState(place.name);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);
  const enterPlace = () => {
    navigate({ to: "/student/place/$id", params: { id: place.uuid } });
  };

  const handleUpdatePlaceNameButton = async () => {
    setIsEditingName((prev) => !prev);
  };

  const handleUpdatePlaceName = async () => {
    try {
      await updatePlace({
        uuid: place.uuid,
        name: editedPlaceName,
        description: "",
      });
      if (onChanged) await onChanged();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      alert("업데이트 실패: " + message);
    }
  };

  const handlePlaceDelete = async () => {
    if (!confirm("정말 삭제하시겠어요?")) return;
    try {
      const ok = await deletePlace(place.uuid);
      if (!ok) throw new Error("삭제에 실패했습니다.");
      if (onChanged) await onChanged();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      alert("삭제 실패: " + message);
    }
  };

  return (
    <div className="w-[300px] border-[2px] border-solid border-[#DDDDDD] rounded-3xl shadow-lg">
      <div className="relative">
        <img
          src="/defaultPlaceThumbnail.png"
          className="w-full border-b- [2px] border-solid border-[#DDDDDD]"
        />
        <button
          className="absolute top-2 left-2 cursor-pointer"
          type="button"
          aria-label="즐겨찾기"
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <img src="/favoriteActive.png" />
          ) : (
            <img src="/favoriteInactive.png" />
          )}
        </button>
        <button
          className="absolute top-2 right-2 cursor-pointer"
          type="button"
          aria-label="옵션 더보기"
          onClick={() => {
            setIsOptionOpen((prev) => !prev);
          }}
        >
          <img src="/moreOptionsButton.png" />
        </button>
        {isOptionOpen && !isEditingName && (
          <PlaceEditingOption
            handlePlaceDelete={handlePlaceDelete}
            handleUpdatePlaceNameButton={handleUpdatePlaceNameButton}
          />
        )}

        {isEditingName && (
          <div className="absolute top-8 right-4">
            <div className="bg-white rounded-t-xl py-[2px] border-[2px] border-solid border-[#DDDDDD]">
              <button
                type="button"
                onClick={handleUpdatePlaceName}
                className="cursor-pointer w-full text-left"
              >
                <span className="text-xs px-2 text-[#F05460]">저장</span>
              </button>
            </div>
            <div className="bg-white py-[2px] rounded-b-xl border-[2px] border-t-[0px] border-solid border-[#DDDDDD]">
              <button
                type="button"
                className="cursor-pointer w-full text-left"
                onClick={() => {
                  setIsEditingName(false);
                  setIsOptionOpen(false);
                }}
              >
                <span className="text-xs px-2 text-[#666666]">취소</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-b-3xl py-4 px-3">
        <div className="flex justify-between items-center w-full">
          {isEditingName ? (
            <input
              type="text"
              className="font-bold text-md truncate block w-[calc(100%-90px)] pl-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              placeholder="플레이스 이름 입력"
              value={editedPlaceName}
              onChange={(e) => setEditedPlaceName(e.target.value)}
            />
          ) : (
            <span className="font-bold text-md truncate block w-[calc(100%-90px)]">
              {place.name}
            </span>
          )}
          <button
            type="button"
            onClick={enterPlace}
            className="bg-rbPrimaryColor rounded-2xl px-4 py-1 cursor-pointer w-[70px]"
          >
            <span className="text-white">입장</span>
          </button>
        </div>

        <span className="text-sm text-gray-400">
          {formatIsoStringToDate(place.lastModifiedAt)}
        </span>
      </div>
    </div>
  );
}
