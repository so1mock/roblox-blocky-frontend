import React, { useState } from "react";
import type { WorkspaceObject } from "../types/workspace";
import { toggleBlockScriptStatus } from "../apis/blockScript";

interface WorkspaceTreeItemProps {
  item: WorkspaceObject;
  level?: number;
  onSelectScript?: (item: WorkspaceObject) => void;
  selectedItemId?: string;
  onToggleBlockScript?: (uuid: string, enabled: boolean) => void;
}

export const WorkspaceTreeItem: React.FC<WorkspaceTreeItemProps> = ({
  item,
  level = 0,
  onSelectScript,
  selectedItemId,
  onToggleBlockScript,
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const [isToggling, setIsToggling] = useState(false);
  
  const hasChildren = item.children && item.children.length > 0;
  const isScript = item.type === "Script";
  const isSelected = selectedItemId === item.uuid;
  
  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };
  
  const handleSelect = () => {
    if (isScript && onSelectScript) {
      onSelectScript(item);
    }
  };

  const handleToggleBlockScript = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isScript || !onToggleBlockScript) return;

    setIsToggling(true);
    try {
      const newStatus = item.isBlockScriptEnabled ? false : true;
      await toggleBlockScriptStatus(
        item.uuid, 
        newStatus ? "ENABLED" : "DISABLED"
      );
      onToggleBlockScript(item.uuid, newStatus);
    } catch (error) {
      console.error("Failed to toggle block script status:", error);
    } finally {
      setIsToggling(false);
    }
  };
  
  const getIcon = () => {
    if (item.type === "Script") {
      return "📄";
    } else if (item.type === "Part") {
      return "🧱";
    } else if (item.type === "Workspace") {
      return "🏠";
    } else if (hasChildren) {
      return isExpanded ? "📂" : "📁";
    } else {
      return "📄";
    }
  };
  
  const paddingLeft = level * 20 + 8;
  
  return (
    <div>
      <div
        className={`
          flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm
          ${isSelected ? "bg-blue-100 border-r-2 border-blue-500" : ""}
          ${isScript ? "cursor-pointer" : ""}
        `}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={isScript ? handleSelect : handleToggle}
      >
        {hasChildren && (
          <span 
            className="mr-1 text-xs select-none"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        {!hasChildren && <span className="mr-1 w-3"></span>}
        <span className="mr-2">{getIcon()}</span>
        <span 
          className={`
            truncate flex-1
            ${isScript ? "text-blue-600 hover:text-blue-800" : "text-gray-700"}
            ${isSelected ? "font-medium" : ""}
          `}
          title={item.name}
        >
          {item.name}
        </span>
        
        {/* 스크립트 파일인 경우 블록 스크립트 토글 스위치 표시 */}
        {isScript && (
          <div className="flex items-center space-x-2 ml-2">
            {item.isBlockScriptEnabled && (
              <span className="text-xs bg-green-100 text-green-700 px-1 rounded">
                Block
              </span>
            )}
            <button
              onClick={handleToggleBlockScript}
              disabled={isToggling}
              className={`
                relative inline-flex h-4 w-7 items-center rounded-full transition-colors
                ${item.isBlockScriptEnabled ? "bg-blue-600" : "bg-gray-300"}
                ${isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                hover:bg-opacity-80
              `}
              title={`블록 스크립트 ${item.isBlockScriptEnabled ? '비활성화' : '활성화'}`}
            >
              <span
                className={`
                  inline-block h-3 w-3 rounded-full bg-white transition-transform
                  ${item.isBlockScriptEnabled ? "translate-x-3.5" : "translate-x-0.5"}
                `}
              />
            </button>
          </div>
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {item.children.map((child) => (
            <WorkspaceTreeItem
              key={child.uuid}
              item={child}
              level={level + 1}
              onSelectScript={onSelectScript}
              selectedItemId={selectedItemId}
              onToggleBlockScript={onToggleBlockScript}
            />
          ))}
        </div>
      )}
    </div>
  );
};
