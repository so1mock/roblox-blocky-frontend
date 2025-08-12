import { useRef, useState } from "react";
import { useBlocklyUI } from "./hooks/useBlocklyUI";
import { WorkspaceExplorer, type WorkspaceExplorerRef } from "./components/WorkspaceExplorer";
import type { WorkspaceObject } from "./types/workspace";
import * as Blockly from "blockly";
import { parseBlocks } from "./apis/block";
import { analyzeVariableUsage } from "../../utils/workspaceParser";
import { saveBlockScript } from "./apis/blockScript";

function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceExplorerRef = useRef<WorkspaceExplorerRef | null>(null);
  const workspaceRef = useBlocklyUI(blocklyDivRef, {
    useServer: true,
  });
  const [selectedScript, setSelectedScript] = useState<WorkspaceObject | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [responseToast, setResponseToast] = useState<{content: string, show: boolean}>({content: '', show: false});

  // 고정된 placeId - 실제로는 URL 파라미터나 props에서 받아올 수 있습니다
  const placeId = "49fb1d76-042d-4c54-bc24-e2fa597e8572";
  
  // 현재 선택된 항목이 스크립트인지 확인
  const isScriptSelected = selectedScript?.type === "Script";
  
  // 저장 버튼 활성화 조건
  const canSave = isScriptSelected && workspaceRef.current && saveStatus !== 'saving';

  const handleSelectScript = (script: WorkspaceObject) => {
    setSelectedScript(script);
    console.log("Selected script:", script);
    
    // 스크립트 타입이고 블록 스크립트가 있다면 로드
    if (script.type === "Script" && script.blockScript && workspaceRef.current) {
      try {
        console.log("Block script content:", script.blockScript);
        
        // 워크스페이스 초기화
        workspaceRef.current.clear();
        
        let blockState;
        
        // BlocklyJson(...) 형식인지 확인
        if (script.blockScript.startsWith("BlocklyJson(")) {
          // BlocklyJson(...) 형식에서 JSON 부분 추출
          const jsonMatch = script.blockScript.match(/BlocklyJson\(blocks=BlockJson\(languageVersion=(\d+),\s*blocks=(\[.*?\])\),\s*variables=(\[.*?\])\)/);
          
          if (jsonMatch) {
            const [, , blocksStr, variablesStr] = jsonMatch;
            const blocks = JSON.parse(blocksStr);
            const variables = JSON.parse(variablesStr);
            
            console.log("Parsed blocks:", blocks);
            console.log("Parsed variables:", variables);
            
            // Blockly serialization API에 맞는 형식
            blockState = {
              version: 1, // Blockly의 현재 serialization 버전
              blocks: {
                languageVersion: 0,
                blocks: blocks
              }
            } as any;
            
            // 변수가 있다면 추가
            if (variables && variables.length > 0) {
              (blockState as any).variables = variables;
            }
          } else {
            throw new Error("Invalid BlocklyJson format");
          }
        } else {
          // 일반 JSON 형식
          blockState = JSON.parse(script.blockScript);
        }
        
        Blockly.serialization.workspaces.load(blockState, workspaceRef.current);
        
        console.log("Block script loaded successfully");
      } catch (error) {
        console.error("Failed to load block script:", error);
      }
    } else if (script.type === "Script" && !script.blockScript && workspaceRef.current) {
      // 블록 스크립트가 없는 스크립트인 경우 워크스페이스 초기화
      workspaceRef.current.clear();
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

  const handleUpdateBlockScript = (uuid: string, blockScript: string) => {
    // 현재 선택된 스크립트가 업데이트된 스크립트인 경우 상태 업데이트
    if (selectedScript && selectedScript.uuid === uuid) {
      setSelectedScript({
        ...selectedScript,
        blockScript: blockScript,
      });
    }
  };

  const handleSave = async () => {
    if (!workspaceRef.current) {
      console.warn("Workspace is not ready.");
      return;
    }

    if (!selectedScript) {
      console.warn("No script selected.");
      return;
    }

    if (selectedScript.type !== "Script") {
      console.warn(`Cannot save: "${selectedScript.name}" is not a script.`);
      return;
    }

    setSaveStatus('saving');

    try {
      const state = Blockly.serialization.workspaces.save(workspaceRef.current);
      
      // 변수 정보 확인
      console.log("Variables in workspace:", state.variables);
      console.log("All variables:", workspaceRef.current.getVariableMap().getAllVariables());
      
      // 전체 workspace 상태 저장 (variables 포함)
      const fullStateJSON = JSON.stringify(state, null, 2);
      localStorage.setItem("workspace-state", fullStateJSON);
      console.log("Full Workspace saved (including variables):\n" + fullStateJSON);
      
      // 서버에 블록 스크립트 저장
      const response = await saveBlockScript(selectedScript.uuid, fullStateJSON);
      console.log(`Block script saved to server for script ${selectedScript.uuid}`);
      console.log("Server response:", response);
      
      // 서버 응답을 토스트로 표시
      const responseContent = response?.content || JSON.stringify(response, null, 2);
      setResponseToast({content: responseContent, show: true});
      
      // 5초 후 토스트 자동 숨김
      setTimeout(() => setResponseToast({content: '', show: false}), 5000);
      
      // 저장 성공 시 현재 선택된 스크립트의 blockScript 업데이트
      setSelectedScript({
        ...selectedScript,
        blockScript: fullStateJSON,
      });
      
      // WorkspaceExplorer의 데이터도 업데이트
      if (workspaceExplorerRef.current) {
        workspaceExplorerRef.current.updateBlockScript(selectedScript.uuid, fullStateJSON);
      }
      
      setSaveStatus('success');
      console.log("✅ 저장 성공! 스크립트 상태가 업데이트되었습니다.");
      
      // 3초 후 상태 초기화
      setTimeout(() => setSaveStatus('idle'), 3000);
      
    } catch (error) {
      console.error("Failed to save block script:", error);
      setSaveStatus('error');
      
      // 5초 후 상태 초기화
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 fixed inset-0">
      {/* 왼쪽 사이드바 - 워크스페이스 탐색기 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <WorkspaceExplorer 
          ref={workspaceExplorerRef}
          placeId={placeId}
          onSelectScript={handleSelectScript}
          onToggleBlockScript={handleToggleBlockScript}
          onUpdateBlockScript={handleUpdateBlockScript}
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
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className={`px-4 py-2 font-semibold rounded transition-colors flex items-center gap-2 ${
                canSave
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } ${
                saveStatus === 'success' ? "bg-green-600 hover:bg-green-700" :
                saveStatus === 'error' ? "bg-red-600 hover:bg-red-700" : ""
              }`}
            >
              {saveStatus === 'saving' && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {saveStatus === 'success' && "✅"}
              {saveStatus === 'error' && "❌"}
              {saveStatus === 'saving' ? '저장 중...' : 
               saveStatus === 'success' ? '저장 완료!' :
               saveStatus === 'error' ? '저장 실패' : '저장'}
            </button>
          </div>
        </div>

        {/* Blockly 워크스페이스 */}
        <div className="flex-1 p-4 relative">
          {!isScriptSelected && (
            <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-gray-500 text-lg mb-2">
                  {selectedScript 
                    ? `"${selectedScript.name}"은(는) 스크립트가 아닙니다`
                    : "스크립트를 선택해주세요"
                  }
                </div>
                <div className="text-gray-400 text-sm">
                  블록 편집을 하려면 Script 타입의 항목을 선택하세요
                </div>
              </div>
            </div>
          )}
          <div
            id="blocklyDiv"
            ref={blocklyDivRef}
            className={`w-full h-full border border-gray-300 rounded shadow-sm ${
              !isScriptSelected ? "pointer-events-none opacity-50" : ""
            }`}
          />
        </div>
      </div>
      
      {/* 서버 응답 토스트 */}
      {responseToast.show && (
        <div className="fixed top-15 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-900">서버 응답</h4>
            <button
              onClick={() => setResponseToast({content: '', show: false})}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="bg-gray-50 p-2 rounded text-xs max-h-32 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{responseToast.content}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
