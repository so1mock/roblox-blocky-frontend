import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getMyPlaces,
  updatePlace,
  deletePlace,
} from "src/domain/myPlaces/apis/place";
import type { PlaceSummary } from "src/domain/myPlaces/workspace/types/workspace";

export const Route = createFileRoute("/student/_mainLayout/my-places")({
  component: RouteComponent,
});

function RouteComponent() {
  const [myPlaces, setMyPlaces] = useState<PlaceSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMyPlaces();
      setMyPlaces(response);
    } catch (e: any) {
      setError(e?.message ?? "플레이스 목록을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdate = async (
    uuid: string,
    currentName: string,
    currentDescription: string,
  ) => {
    const name = prompt("이름을 입력하세요", currentName)?.trim();
    if (name == null) return;
    const description = prompt("설명을 입력하세요", currentDescription)?.trim();
    if (description == null) return;
    try {
      await updatePlace(uuid, name, description);
      await refresh();
    } catch (e: any) {
      alert("업데이트 실패: " + (e?.message ?? e));
    }
  };

  const onDelete = async (uuid: string) => {
    if (!confirm("정말 삭제하시겠어요?")) return;
    try {
      const ok = await deletePlace(uuid);
      if (!ok) throw new Error("삭제에 실패했습니다.");
      await refresh();
    } catch (e: any) {
      alert("삭제 실패: " + (e?.message ?? e));
    }
  };

  useEffect(() => {
    refresh();
  }, []);
  return (
    <>
      <div>
        {isLoading && <div>로딩 중...</div>}
        {!isLoading && error && <div>오류: {error}</div>}
        {!isLoading && !error && myPlaces.length === 0 && (
          <div>플레이스가 없습니다.</div>
        )}
        {!isLoading && !error && myPlaces.length > 0 && (
          <div>
            {myPlaces.map((placeSummary) => {
              return (
                <div
                  key={placeSummary.uuid}
                  className="w-150 p-4 border border-gray-200 rounded-md mb-3 bg-white"
                >
                  {placeSummary.uuid} <br />
                  name: {placeSummary.name} <br />
                  description: {placeSummary.description} <br />
                  owner: {placeSummary.ownerName} <br />
                  lastModified: {placeSummary.lastModifiedAt} <br />
                  <div className="mt-2 flex gap-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                      onClick={() =>
                        onUpdate(
                          placeSummary.uuid,
                          placeSummary.name,
                          placeSummary.description,
                        )
                      }
                    >
                      업데이트
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
                      onClick={() => onDelete(placeSummary.uuid)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
