function BoardListItem() {
  return (
    <div className="whitespace-nowrap py-3 border-solid border-[#DEDEDE] border-b-2 bg-white">
      <div className="inline-block align-middle w-[900px] text-left pl-4 overflow-hidden truncate">
        <span
          className="text-md text-rbPointColor font-bold whitespace-nowrap"
          title="잼민이는 못 깨는 타워 따라 만들기"
        >
          잼민이는 못 깨는 타워 따라 만들기
        </span>
      </div>
      <div className="inline-block align-middle w-[200px] text-center overflow-hidden truncate">
        <span
          className="text-md text-[#888888] whitespace-nowrap"
          title={"2025-10-10T09:30:00Z"}
        >
          {new Date("2025-10-10T09:30:00Z")
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\s/g, "")}
        </span>
      </div>
    </div>
  );
}

export default BoardListItem;
