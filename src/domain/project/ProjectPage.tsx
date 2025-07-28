import { useEffect, useRef } from "react";
import { useBlocklyUI } from "./hooks/useBlocklyUI";
import * as Blockly from "blockly";

const state = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: "mod_block",
        id: ")|w2#+p.@BTruM/|5hDS",
        x: 65,
        y: 326,
        inputs: {
          A: {
            shadow: {
              type: "math_number",

              fields: {
                NUM: 123,
              },
            },
          },
          B: {
            shadow: {
              type: "math_number",

              fields: {
                NUM: 0,
              },
            },
          },
        },
      },
    ],
  },
};
function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useBlocklyUI(blocklyDivRef);

  useEffect(() => {
    if (workspaceRef.current) {
      Blockly.serialization.workspaces.load(state, workspaceRef.current);
    }
  }, []);

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
