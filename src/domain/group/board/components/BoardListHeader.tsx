function BoardListHeader() {
  return (
    <div className="custom-scrollbar whitespace-nowrap bg-white py-4 border-solid border-[#DEDEDE] border-b-2">
      <div className="w-[900px] inline-block text-center">
        <span className="text-black text-xl font-bold">제목</span>
      </div>
      <div className="w-[200px] inline-block text-center">
        <span className="text-black text-xl font-bold">작성일</span>
      </div>
    </div>
  );
}

export default BoardListHeader;
