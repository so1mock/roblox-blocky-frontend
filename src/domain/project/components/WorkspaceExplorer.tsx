import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { WorkspaceTreeItem } from "./WorkspaceTreeItem";
import { getWorkspaceData } from "../apis/workspace";
import type { WorkspaceData, WorkspaceObject } from "../types/workspace";

interface WorkspaceExplorerProps {
  placeId: string;
  onSelectScript?: (script: WorkspaceObject) => void;
  onToggleBlockScript?: (uuid: string, enabled: boolean) => void;
  onUpdateBlockScript?: (uuid: string, blockScript: string) => void;
  className?: string;
}

export interface WorkspaceExplorerRef {
  updateBlockScript: (uuid: string, blockScript: string) => void;
}

export const WorkspaceExplorer = forwardRef<WorkspaceExplorerRef, WorkspaceExplorerProps>(({
  placeId,
  onSelectScript,
  onToggleBlockScript,
  onUpdateBlockScript,
  className = "",
}, ref) => {
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData | null>(null);
  const [selectedScriptId, setSelectedScriptId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getWorkspaceData(placeId);
        setWorkspaceData(data);
      } catch (err) {
        setError("워크스페이스 데이터를 불러올 수 없습니다.");
        console.error("Failed to fetch workspace data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (placeId) {
      fetchWorkspaceData();
    }
  }, [placeId]);

  const handleSelectScript = (script: WorkspaceObject) => {
    setSelectedScriptId(script.uuid);
    if (onSelectScript) {
      onSelectScript(script);
    }
  };

  const handleToggleBlockScript = (uuid: string, enabled: boolean) => {
    // 워크스페이스 데이터 업데이트
    setWorkspaceData((prevData) => {
      if (!prevData) return prevData;
      
      const updateObject = (obj: WorkspaceObject): WorkspaceObject => {
        if (obj.uuid === uuid) {
          return { ...obj, isBlockScriptEnabled: enabled };
        }
        if (obj.children) {
          return {
            ...obj,
            children: obj.children.map(updateObject),
          };
        }
        return obj;
      };

      return {
        ...prevData,
        objects: prevData.objects.map(updateObject),
      };
    });

    if (onToggleBlockScript) {
      onToggleBlockScript(uuid, enabled);
    }
  };

  const updateBlockScript = (uuid: string, blockScript: string) => {
    // 워크스페이스 데이터 업데이트
    setWorkspaceData((prevData) => {
      if (!prevData) return prevData;
      
      const updateObject = (obj: WorkspaceObject): WorkspaceObject => {
        if (obj.uuid === uuid) {
          return { ...obj, blockScript: blockScript };
        }
        if (obj.children) {
          return {
            ...obj,
            children: obj.children.map(updateObject),
          };
        }
        return obj;
      };

      return {
        ...prevData,
        objects: prevData.objects.map(updateObject),
      };
    });

    if (onUpdateBlockScript) {
      onUpdateBlockScript(uuid, blockScript);
    }
  };

  // ref로 updateBlockScript 함수 노출
  useImperativeHandle(ref, () => ({
    updateBlockScript,
  }));

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!workspaceData) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-gray-500">데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 ${className}`}>
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
      <div className="overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        {workspaceData.objects.map((obj) => (
          <WorkspaceTreeItem
            key={obj.uuid}
            item={obj}
            onSelectScript={handleSelectScript}
            selectedItemId={selectedScriptId}
            onToggleBlockScript={handleToggleBlockScript}
          />
        ))}
      </div>

      {/* 푸터 */}
      <div className="border-t border-gray-200 p-2 bg-gray-50 text-xs text-gray-500">
        마지막 수정: {new Date(workspaceData.placeSummary.lastModifiedAt).toLocaleString("ko-KR")}
      </div>
    </div>
  );
});
