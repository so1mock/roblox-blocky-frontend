function BoardDeatiledPage({
  groupId,
  boardId,
}: {
  groupId: string;
  boardId: string;
}) {
  return (
    <div className="w-[1600px] mx-auto flex justify-center gap-24">
      <div className="w-[1200px]">
        <h1 className="font-bold text-4xl">게시판</h1>
      </div>
    </div>
  );
}

export default BoardDeatiledPage;
