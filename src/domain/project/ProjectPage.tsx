import { useRef } from "react";
import { useBlocklyUI } from "./hooks/useBlocklyUI";
import * as Blockly from "blockly";

function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useBlocklyUI(blocklyDivRef, {
    useServer: false,
  });

  const handleSave = () => {
    if (workspaceRef.current) {
      const state = Blockly.serialization.workspaces.save(workspaceRef.current);
      const stateJSON = JSON.stringify(state, null, 2); // 보기 좋게 저장
      localStorage.setItem("workspace-state", stateJSON);
      console.log("Workspace saved:", stateJSON);
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
