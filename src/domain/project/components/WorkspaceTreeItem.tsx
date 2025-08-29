import { useState } from "react";
import type { WorkspaceObject } from "../blockly/types/workspace";
import { getIcon } from "../utils/getIcon";

function WorkspaceTreeItem({
  object,
  level = 0,
}: {
  object: WorkspaceObject;
  level: number;
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const hasChildren = object.children && object.children.length > 0;
  const isScript = object.type === "Script";
  const paddingLeft = level * 20 + 8;
  const iconType =
    object.type === "Script"
      ? "script"
      : object.type === "Part"
        ? "part"
        : object.type === "Workspace"
          ? "workspace"
          : hasChildren
            ? isExpanded
              ? "openFolder"
              : "closedFolder"
            : "script"; // fallback

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <button
        className={`w-full cursor-pointer
      flex items-center py-1 px-2 hover:bg-gray-100 text-sm
      ${isScript ? "cursor-pointer" : ""}
    `}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={() => {
          handleToggle();
        }}
      >
        {hasChildren && (
          <span
            className="mr-1 text-xs select-none"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        {!hasChildren && <span className="mr-1 w-3"></span>}
        <span className="mr-2">{getIcon(iconType)}</span>
        <span
          className={`
        truncate
        ${isScript ? "text-blue-600 hover:text-blue-800" : "text-gray-700"}
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
              className={`
            relative inline-flex h-4 w-7 items-center rounded-full transition-colors
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
      </button>

      {hasChildren && isExpanded && (
        <div>
          {object.children.map((child) => (
            <WorkspaceTreeItem
              key={child.uuid}
              object={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkspaceTreeItem;
