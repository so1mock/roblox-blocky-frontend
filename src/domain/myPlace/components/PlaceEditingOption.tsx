import { useRef } from "react";

interface PlaceEditingOptionProps {
  handlePlaceDelete: () => void;
  handleUpdatePlaceNameButton: () => void;
  handleEditThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PlaceEditingOption({
  handlePlaceDelete,
  handleUpdatePlaceNameButton,
  handleEditThumbnail,
}: PlaceEditingOptionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute top-8 right-4 w-[130px]">
      <div className="bg-white rounded-t-xl py-[2px] border-[2px] border-solid border-[#DDDDDD]">
        <button
          type="button"
          onClick={handlePlaceDelete}
          className="cursor-pointer w-full text-left"
        >
          <span className="text-xs px-2 text-[#F05460]">플레이스 삭제</span>
        </button>
      </div>
      <div className="bg-white py-[2px] border-x-[2px] border-solid border-[#DDDDDD]">
        <>
          <input
            type="file"
            accept=".jpeg,.jpg,.png"
            ref={fileInputRef}
            className="hidden"
            onChange={handleEditThumbnail}
          />

          <button
            type="button"
            className="cursor-pointer w-full text-left"
            onClick={handleButtonClick}
          >
            <span className="text-xs px-2 text-[#666666]">
              대표 이미지 수정
            </span>
          </button>
        </>
      </div>
      <div className="bg-white rounded-b-xl py-[2px] border-[2px] border-solid border-[#DDDDDD]">
        <button
          type="button"
          onClick={handleUpdatePlaceNameButton}
          className="cursor-pointer w-full text-left"
        >
          <span className="text-xs px-2 text-[#666666]">
            플레이스 이름 수정
          </span>
        </button>
      </div>
    </div>
  );
}
