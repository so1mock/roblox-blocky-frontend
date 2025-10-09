interface PlaceEditingOptionProps {
  handlePlaceDelete: () => void;
  handleUpdatePlaceNameButton: () => void;
}

export function PlaceEditingOption({
  handlePlaceDelete,
  handleUpdatePlaceNameButton,
}: PlaceEditingOptionProps) {
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
        <button type="button" className="cursor-pointer w-full text-left">
          <span className="text-xs px-2 text-[#666666]">대표 이미지 수정</span>
        </button>
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
