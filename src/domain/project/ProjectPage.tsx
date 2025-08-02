import { useRef } from "react";
import { useBlocklyUI } from "./hooks/useBlocklyUI";
import * as Blockly from "blockly";
import { parseBlocks } from "./apis/block";

function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useBlocklyUI(blocklyDivRef, {
    useServer: false,
  });

  const handleSave = async () => {
    if (workspaceRef.current) {
      const state = Blockly.serialization.workspaces.save(workspaceRef.current);
      const stateJSON = JSON.stringify(state.blocks, null, 2); // 보기 좋게 저장
      localStorage.setItem("workspace-state", stateJSON);
      console.log("Workspace saved:\n" + stateJSON);
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
      <button
        type="button"
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
      >
        Workspace Data Save
      </button>
    </div>
  );
}

export default ProjectPage;
