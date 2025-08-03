import { useRef } from "react";
import { useBlocklyUI } from "./hooks/useBlocklyUI";
import * as Blockly from "blockly";
import { parseBlocks } from "./apis/block";
import { analyzeVariableUsage } from "../../utils/workspaceParser";

function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useBlocklyUI(blocklyDivRef, {
    useServer: false,
  });

  const handleSave = async () => {
    if (workspaceRef.current) {
      const state = Blockly.serialization.workspaces.save(workspaceRef.current);
      
      // 변수 정보 확인
      console.log("Variables in workspace:", state.variables);
      console.log("All variables:", workspaceRef.current.getAllVariables());
      
      // 전체 workspace 상태 저장 (variables 포함)
      const fullStateJSON = JSON.stringify(state, null, 2);
      localStorage.setItem("workspace-state", fullStateJSON);
      console.log("Full Workspace saved (including variables):\n" + fullStateJSON);
      
      // blocks만 따로 저장 (기존 호환성을 위해)
      const blocksOnlyJSON = JSON.stringify(state.blocks, null, 2);
      localStorage.setItem("workspace-blocks-only", blocksOnlyJSON);
      console.log("Blocks only saved:\n" + blocksOnlyJSON);
      
      // 첫번째 blocks 내부의 요소들만 서버로 보내기
      const blocksToSend = state.blocks.blocks;
      try {
        const response = await parseBlocks(blocksToSend);
        console.log("Server parse response:\n" + response);
      } catch (error) {
        console.error("Failed to parse blocks:", error);
      }
    } else {
      console.warn("Workspace is not ready.");
    }
  };

  return (
    <div>
      <div
        id="blocklyDiv"
        ref={blocklyDivRef}
        className="w-full h-[480px] border border-gray-300"
      />
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Workspace Data Save
        </button>
      </div>
    </div>
  );
}

export default ProjectPage;
