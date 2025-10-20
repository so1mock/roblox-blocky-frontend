import { useState } from "react";
import { deleteWall } from "../apis/wall";

function GroupWallOptions({
  messageUuid,
  onChanged,
}: {
  messageUuid: string;
  onChanged: () => void | Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteWall(messageUuid);
      await onChanged();
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      alert("삭제에 실패했습니다: " + message);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="absolute top-16 right-6 w-[80px]">
      <div className="bg-white rounded-xl border-[1.5px] border-solid border-[#DDDDDD] px-2 py-1">
        <button
          type="button"
          disabled={isDeleting}
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
