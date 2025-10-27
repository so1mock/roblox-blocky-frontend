import { useEffect, useRef, useState } from "react";
import type { PlaceSummary } from "@place/types/place";
import { useNavigate } from "@tanstack/react-router";
import { PlaceEditingOption } from "./PlaceEditingOption";
import { formatIsoStringToDate } from "../../common/utils/formatIsoStringToDate";
import Button from "@common/components/Button";
import { useEditPlaceMutation } from "@myPlace/hooks/useEditPlaceMutation";
import { useDeletePlaceMutation } from "@myPlace/hooks/useDeletePlaceMutation";
import { useUploadImageMutation } from "@myPlace/hooks/useUploadImageMutation";

export function PlaceCard({ place }: { place: PlaceSummary }) {
  const editPlaceMutation = useEditPlaceMutation();
  const deletePlaceMutation = useDeletePlaceMutation();
  const uploadImageMutation = useUploadImageMutation();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [editedPlaceName, setEditedPlaceName] = useState<string>(place.name);
  const inputNameRef = useRef<HTMLInputElement>(null); // ✅ input 참조용 ref 추가
  const imgRef = useRef<HTMLImageElement>(null);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);
  const enterPlace = () => {
    navigate({ to: "/student/place/$id", params: { id: place.uuid } });
  };

  const handleUpdatePlaceNameButton = async () => {
    setIsEditingName((prev) => !prev);
  };

  const handleUpdatePlaceName = async () => {
    editPlaceMutation.mutate({
      uuid: place.uuid,
      name: editedPlaceName,
      description: place.description,
    });
    setIsEditingName(false);
    setIsOptionOpen(false);
    setEditedPlaceName(place.name);
  };

  const handleUpdateThumbnail = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    uploadImageMutation.mutate({ uuid: place.uuid, file });
    setIsOptionOpen(false);
  };

  const handlePlaceDelete = async () => {
    if (!confirm("정말 삭제하시겠어요?")) return;
    deletePlaceMutation.mutate(place.uuid);
  };

  useEffect(() => {
    if (isEditingName && inputNameRef.current) {
      inputNameRef.current.focus();
      inputNameRef.current.select();
    }
  }, [isEditingName]);

  return (
    <div className="w-[300px] border-[2px] border-solid border-[#DDDDDD] rounded-3xl shadow-lg">
      <div className="relative h-[150px]">
        <img
          ref={imgRef}
          src={place.mainImageUrl}
          className="w-full h-full object-cover border-b-[2px] border-solid border-[#DDDDDD]"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/defaultPlaceThumbnail.png";
          }}
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
            handleUpdateThumbnail={handleUpdateThumbnail}
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
                  setEditedPlaceName(place.name);
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdatePlaceName(); // 저장
                }
              }}
              ref={inputNameRef}
            />
          ) : (
            <span className="font-bold text-md truncate block w-[calc(100%-90px)]">
              {place.name}
            </span>
          )}
          <Button handleButtonClick={enterPlace} text="입장" />
        </div>

        <span className="text-sm text-gray-400">
          {formatIsoStringToDate(place.lastModifiedAt)}
        </span>
      </div>
    </div>
  );
}
