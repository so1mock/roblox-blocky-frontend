function GroupWallOptions({
  handleDelete,
  handleEdit,
  disabled,
}: {
  handleDelete: () => Promise<void> | void;
  handleEdit: () => Promise<void> | void;
  disabled: boolean;
}) {
  return (
    <div className="absolute top-16 right-6 w-[80px]">
      <div className="bg-white rounded-t-xl border-[1.5px] border-solid border-[#DDDDDD] px-2 py-1">
        <button
          type="button"
          disabled={disabled}
          className="cursor-pointer w-full text-center"
          onClick={handleEdit}
        >
          <span className="text-xs text-[#666666]">수정하기</span>
        </button>
      </div>
      <div className="bg-white rounded-b-xl border-[1.5px] border-t-0 border-b-solid border-[#DDDDDD] px-2 py-1">
        <button
          type="button"
          disabled={disabled}
          className="cursor-pointer w-full text-center"
          onClick={handleDelete}
        >
          <span className="text-xs text-[#F05460]">삭제하기</span>
        </button>
      </div>
    </div>
  );
}

export default GroupWallOptions;
