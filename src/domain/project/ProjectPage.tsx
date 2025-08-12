import { useRef, useState } from "react";
import { useBlocklyUI } from "./hooks/useBlocklyUI";
import { WorkspaceExplorer } from "./components/WorkspaceExplorer";
import type { WorkspaceObject } from "./types/workspace";
import * as Blockly from "blockly";
import { parseBlocks } from "./apis/block";
import { analyzeVariableUsage } from "../../utils/workspaceParser";

function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useBlocklyUI(blocklyDivRef, {
    useServer: true,
  });
  const [selectedScript, setSelectedScript] = useState<WorkspaceObject | null>(null);

  // 고정된 placeId - 실제로는 URL 파라미터나 props에서 받아올 수 있습니다
  const placeId = "49fb1d76-042d-4c54-bc24-e2fa597e8572";

  const handleSelectScript = (script: WorkspaceObject) => {
    setSelectedScript(script);
    console.log("Selected script:", script);
    
    // 블록 스크립트가 있다면 로드
    if (script.blockScript) {
      console.log("Block script content:", script.blockScript);
      // TODO: 블록 스크립트를 Blockly 워크스페이스에 로드하는 로직 추가
    }
  };

  const handleToggleBlockScript = (uuid: string, enabled: boolean) => {
    console.log(`Block script ${enabled ? 'enabled' : 'disabled'} for script ${uuid}`);
    
    // 현재 선택된 스크립트가 업데이트된 스크립트인 경우 상태 업데이트
    if (selectedScript && selectedScript.uuid === uuid) {
      setSelectedScript({
        ...selectedScript,
        isBlockScriptEnabled: enabled,
      });
    }
  };

  const handleSave = async () => {
    if (workspaceRef.current) {
      const state = Blockly.serialization.workspaces.save(workspaceRef.current);
      
      // 변수 정보 확인
      console.log("Variables in workspace:", state.variables);
      console.log("All variables:", workspaceRef.current.getVariableMap().getAllVariables());
      
      // 전체 workspace 상태 저장 (variables 포함)
      const fullStateJSON = JSON.stringify(state, null, 2);
      localStorage.setItem("workspace-state", fullStateJSON);
      console.log("Full Workspace saved (including variables):\n" + fullStateJSON);
      
    } else {
      console.warn("Workspace is not ready.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 fixed inset-0">
      {/* 왼쪽 사이드바 - 워크스페이스 탐색기 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <WorkspaceExplorer 
          placeId={placeId}
          onSelectScript={handleSelectScript}
          onToggleBlockScript={handleToggleBlockScript}
          className="flex-1"
        />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 툴바 */}
        <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-medium text-gray-900">
              블록 편집기
            </h2>
            {selectedScript && (
              <span className="text-sm text-gray-600">
                편집 중: {selectedScript.name}
              </span>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            저장
          </button>
        </div>

        {/* Blockly 워크스페이스 */}
        <div className="flex-1 p-4">
          <div
            id="blocklyDiv"
            ref={blocklyDivRef}
            className="w-full h-full border border-gray-300 rounded shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
