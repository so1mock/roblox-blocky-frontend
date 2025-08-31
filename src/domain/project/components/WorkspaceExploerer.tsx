import { useWorkspaceDataStore } from "../stores/useWorkspaceDataStore";
import WorkspaceTreeItem from "./WorkspaceTreeItem";

function WorkspaceExploerer({ placeId }: { placeId: string }) {
  const { workspaceData, selectedScript } = useWorkspaceDataStore();
  if (!workspaceData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200">
      {/* 헤더 */}
      <div className="border-b border-gray-200 p-3 bg-gray-50">
        <h3 className="font-medium text-gray-900 text-sm">
          {workspaceData.placeSummary.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          소유자: {workspaceData.placeSummary.ownerName}
        </p>
      </div>

      {/* 트리 */}
      <div className="overflow-auto">
        {workspaceData.objects.map((object) => (
          <WorkspaceTreeItem
            key={object.uuid}
            placeId={placeId}
            object={object}
            level={0}
          />
        ))}
      </div>

      {/* 푸터 */}
      <div className="border-t border-gray-200 p-2 bg-gray-50 text-xs text-gray-500">
        마지막 수정:{" "}
        {new Date(workspaceData.placeSummary.lastModifiedAt).toLocaleString(
          "ko-KR",
        )}
      </div>
    </div>
  );
}

export default WorkspaceExploerer;
