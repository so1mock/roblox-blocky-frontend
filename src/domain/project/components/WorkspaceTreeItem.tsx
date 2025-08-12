import React, { useState } from "react";
import type { WorkspaceObject } from "../types/workspace";

interface WorkspaceTreeItemProps {
  item: WorkspaceObject;
  level?: number;
  onSelectScript?: (item: WorkspaceObject) => void;
  selectedItemId?: string;
}

export const WorkspaceTreeItem: React.FC<WorkspaceTreeItemProps> = ({
  item,
  level = 0,
  onSelectScript,
  selectedItemId,
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  
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
        {item.isBlockScriptEnabled && (
          <span className="ml-1 text-xs bg-green-100 text-green-700 px-1 rounded">
            Block
          </span>
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
            />
          ))}
        </div>
      )}
    </div>
  );
};
