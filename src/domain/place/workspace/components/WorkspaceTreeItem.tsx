import { useState } from "react";
import type { WorkspaceObject } from "../types/workspace";
import { getIcon } from "../utils/getIcon";
import {
  getWorkspaceDataByPlaceId,
  toggleBlockScriptStatus,
} from "../apis/workspace";
import { useWorkspaceDataStore } from "../stores/useWorkspaceDataStore";

function WorkspaceTreeItem({
  placeId,
  object,
  level = 0,
  readOnly = false,
}: {
  placeId: string;
  object: WorkspaceObject;
  level: number;
  readOnly: boolean;
}) {
  const { setWorkspaceData, selectedScript, setSelectedScript } =
    useWorkspaceDataStore();
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const hasChildren = object.children && object.children.length > 0;
  const isScript = object.type === "Script";
  const isSelected = selectedScript?.uuid === object.uuid;
  const paddingLeft = level * 20 + 8;

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (hasChildren) {
      setIsExpanded((prev) => !prev);
    }
  };

  const handleSelect = () => {
    if (object.type !== "Script") return;
    if (selectedScript === object) setSelectedScript(undefined);
    else setSelectedScript(object);
  };

  const handleToggleBlockScriptStatus = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (readOnly) {
      return;
    }
    if (!isScript) return;

    try {
      const newStatus = object.isBlockScriptEnabled ? false : true;
      await toggleBlockScriptStatus(
        placeId,
        object.uuid,
        newStatus ? "ENABLED" : "DISABLED",
      );

      const data = await getWorkspaceDataByPlaceId(placeId);
      setWorkspaceData(data);
    } catch (error) {
      console.error("Failed to toggle block script status:", error);
    }
  };

  return (
    <div>
      <div
        role="button"
        className={`w-full cursor-pointer
      flex items-center py-1 px-2 text-sm
       ${isSelected ? "bg-blue-100 border-r-2 border-blue-500" : "hover:bg-gray-100"}
    `}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={handleSelect}
      >
        {hasChildren && (
          <span onClick={handleToggle} className="mr-1 text-xs select-none">
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        {!hasChildren && <span className="mr-1 w-3"></span>}
        <span className="mr-2">{getIcon(object.type)}</span>
        <span
          className={`
        flex-1 text-left truncate
        ${isScript ? "text-blue-600 hover:text-blue-800" : "text-gray-700"}
         ${isSelected ? "font-medium" : ""}
      `}
          title={object.name}
        >
          {object.name}
        </span>

        {/* 스크립트 파일인 경우 블록 스크립트 토글 스위치 표시 */}
        {isScript && (
          <div className="flex items-center space-x-2 ml-2">
            {object.isBlockScriptEnabled && (
              <span className="text-xs bg-green-100 text-green-700 px-1 rounded">
                Block
              </span>
            )}
            <button
              onClick={handleToggleBlockScriptStatus}
              className={`cursor-pointer
             inline-flex h-4 w-7 items-center rounded-full transition-colors
            ${object.isBlockScriptEnabled ? "bg-blue-600" : "bg-gray-300"}
          `}
              title={`블록 스크립트 ${object.isBlockScriptEnabled ? "비활성화" : "활성화"}`}
            >
              <span
                className={`
              inline-block h-3 w-3 rounded-full bg-white transition-transform
              ${object.isBlockScriptEnabled ? "translate-x-3.5" : "translate-x-0.5"}
            `}
              />
            </button>
          </div>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div>
          {object.children.map((childObject) => (
            <WorkspaceTreeItem
              key={object.uuid}
              placeId={placeId}
              object={childObject}
              level={level + 1}
              readOnly={readOnly}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkspaceTreeItem;
