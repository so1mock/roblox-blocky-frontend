import Button from "@common/components/Button";
import { useState } from "react";
import { createWall } from "../apis/wall";
import { useParams } from "@tanstack/react-router";

function GroupWallCreateForm({
  refreshWalls,
}: {
  refreshWalls: () => Promise<void>;
}) {
  const { groupId: groupUuid } = useParams({
    from: "/student/_mainLayout/group/$groupId",
  });
  const [content, setContent] = useState("");
  const [createWallError, setCreateWallError] = useState<string | null>(null);
  const [createWallLoading, setCreateWallLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    const body = content.trim();
    if (!body) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (createWallLoading) return;
    setCreateWallLoading(true);
    setCreateWallError(null);
    try {
      await createWall({ groupUuid, content: body });
      setContent("");
      await refreshWalls();
    } catch (e) {
      if (e instanceof Error) {
        setCreateWallError(e.message ?? "담벼락 작성에 실패했습니다.");
      }
    } finally {
      setCreateWallLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
      className="w-full relative"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        disabled={createWallLoading}
        className="w-full m-4 ml-0 p-6 min-h-[120px] bg-[#F9F9F9] rounded-2xl disabled:opacity-60"
      />
      <div className="absolute bottom-10 right-8">
        <Button
          text={createWallLoading ? "게시 중..." : "게시하기"}
          handleButtonClick={() => {
            if (!createWallLoading) void handleSubmit();
          }}
        />
      </div>
      {createWallError && (
        <div className="text-sm text-red-500 mt-2 ml-1">{createWallError}</div>
      )}
    </form>
  );
}

export default GroupWallCreateForm;
