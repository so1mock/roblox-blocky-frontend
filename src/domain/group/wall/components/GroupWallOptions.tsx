function GroupWallOptions() {
  return (
    <div className="absolute top-16 right-6 w-[80px]">
      <div className="bg-white rounded-xl border-[1.5px] border-solid border-[#DDDDDD] px-2 py-1">
        <button type="button" className="cursor-pointer w-full text-center">
          <span className="text-xs text-[#F05460]">삭제하기</span>
        </button>
      </div>
    </div>
  );
}

export default GroupWallOptions;
