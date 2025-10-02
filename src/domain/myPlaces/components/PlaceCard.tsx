import { useState } from "react";
import type { PlaceSummary } from "../workspace/types/workspace";
import { useNavigate } from "@tanstack/react-router";
import { updatePlace, deletePlace } from "../apis/place";

interface PlaceCardProps {
  place: PlaceSummary;
  onChanged?: () => Promise<void> | void; // 변경 후 상위에서 재조회 용도
}

export function PlaceCard({ place, onChanged }: PlaceCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleFavorite = () => setIsFavorite((prev) => !prev);
  const enterPlace = () => {
    navigate({ to: "/student/place/$id", params: { id: place.uuid } });
  };

  const onUpdate = async () => {
    const name = prompt("이름을 입력하세요", place.name)?.trim();
    if (name == null) return;
    const description = prompt("설명을 입력하세요", place.description)?.trim();
    if (description == null) return;
    try {
      await updatePlace(place.uuid, name, description);
      if (onChanged) await onChanged();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      alert("업데이트 실패: " + message);
    }
  };

  const onDelete = async () => {
    if (!confirm("정말 삭제하시겠어요?")) return;
    try {
      const ok = await deletePlace(place.uuid);
      if (!ok) throw new Error("삭제에 실패했습니다.");
      if (onChanged) await onChanged();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      alert("삭제 실패: " + message);
    }
  };

  return (
    <div className="w-150 p-4 border border-gray-200 rounded-md mb-3 bg-white">
      {place.uuid} <br />
      name: {place.name} <br />
      description: {place.description} <br />
      owner: {place.ownerName} <br />
      lastModified: {place.lastModifiedAt} <br />
      <div className="mt-2 flex gap-2 items-center">
        <button
          type="button"
          aria-label="즐겨찾기"
          className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
          onClick={toggleFavorite}
        >
          <span className={isFavorite ? "text-yellow-400" : "text-gray-400"}>
            ★
          </span>
          <span className="ml-1">즐겨찾기</span>
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
          onClick={enterPlace}
        >
          입장
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          onClick={onUpdate}
        >
          업데이트
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
          onClick={onDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
