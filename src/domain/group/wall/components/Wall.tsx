import GroupWallCreateForm from "./GroupWallCreateForm";
import type { WallInfo } from "../types/wall";
import { useEffect, useState } from "react";
import { getGroupWalls } from "../apis/wall";
import GroupWallItem from "./GroupWallItem";

function Wall({ groupUuid }: { groupUuid: string }) {
  const [walls, setWalls] = useState<WallInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const walls = await getGroupWalls(groupUuid);
      setWalls(walls);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <span className="font-bold text-2xl">담벼락</span>
      <GroupWallCreateForm onChanged={refresh} groupUuid={groupUuid} />

      {loading && <div>로딩 중...</div>}
      {!loading && error && <div>오류: {error}</div>}
      {!loading && !error && walls.length === 0 && (
        <div>담벼락이 없습니다.</div>
      )}
      {!loading &&
        !error &&
        walls.length > 0 &&
        walls.map((wallInfo) => (
          <GroupWallItem
            key={wallInfo.uuid}
            wallInfo={wallInfo}
            onChanged={refresh}
          />
        ))}
    </div>
  );
}

export default Wall;
