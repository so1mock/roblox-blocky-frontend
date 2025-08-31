import * as Blockly from "blockly";
import { useEffect, useRef } from "react";
import { useBlocklyUI } from "../hooks/useBlocklyUi";
import WorkspaceExploerer from "./WorkspaceExploerer";
import BlockCodingHeader from "./BlockCodingHeader";
import { getWorkspaceDataByPlaceId } from "../apis/workspace";
import { useWorkspaceDataStore } from "../stores/useWorkspaceDataStore";

function BlockCodingPage({ id: placeId }: { id: string }) {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const { workspaceRef, loading, error } = useBlocklyUI(blocklyDivRef, {
    useServer: true,
  });
  const { setWorkspaceData, selectedScript, setSelectedScript } =
    useWorkspaceDataStore();

  useEffect(() => {
    if (selectedScript === undefined) return;

    if (!workspaceRef.current) return;
    workspaceRef.current.clear();
    let blockState;
    if (selectedScript.blockScript) {
      blockState = selectedScript.blockScript;
      Blockly.serialization.workspaces.load(blockState, workspaceRef.current);
    } else {
      // 블록 스크립트가 존재하지 않으면 기본 상태로 렌더링한다
      blockState = {
        version: 1, // Blockly의 현재 serialization 버전
        blocks: {
          languageVersion: 0,
          blocks: [],
        },
      };
    }
    Blockly.serialization.workspaces.load(blockState, workspaceRef.current);
  }, [selectedScript]);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const data = await getWorkspaceDataByPlaceId(placeId);
        setWorkspaceData(data);
      } catch (err) {
        console.error("Failed to fetch workspace data:", err);
      }
    };

    if (placeId) {
      fetchWorkspaceData();
    }
  }, [placeId]);

  return (
    <div className="flex bg-gray-100 h-screen">
      {/* 왼쪽 사이드바 - 워크스페이스 탐색기 */}
      <aside className="w-80 bg-white border-r border-gray-200">
        <WorkspaceExploerer placeId={placeId} />
      </aside>
      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}

        <BlockCodingHeader
          placeId={placeId}
          selectedScript={selectedScript}
          workspaceRef={workspaceRef}
        />

        {/* 블록 조립 */}
        <div className="flex-1 p-4 relative">
          {!selectedScript && (
            <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex flex-col items-center justify-center z-90">
              <span className="text-gray-500 text-lg mb-2">
                스크립트를 선택해주세요
              </span>
              <span className="text-gray-400 text-sm">
                블록 편집을 하려면 Script 타입의 항목을 선택하세요
              </span>
            </div>
          )}

          {loading && <div className="text-gray-500 mb-2">블록 로딩 중...</div>}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div
            id="blocklyDiv"
            ref={blocklyDivRef}
            className="w-full h-full rounded-xl border border-gray-200 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default BlockCodingPage;
