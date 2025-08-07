import { useRef } from "react";
import { useBlocklyUI } from "./hooks/useBlocklyUI";
import * as Blockly from "blockly";
import { hitContents } from "./blocky/local/toolbox/categories/hitContents";
import toolbox from "./blocky/local/toolbox/toolbox";
import part_icon from "../assets/part_icon.png";

function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useBlocklyUI(blocklyDivRef, {
    useServer: false,
  });

  const addHitCategory = () => {
    const workspace = workspaceRef.current;
    if (workspace) {
      // 1. 기존 toolbox JSON 가져오기
      const newToolbox = {
        kind: "categoryToolbox",
        contents: [
          ...toolbox.contents,
          {
            kind: "category",
            name: "hit관련",
            categorystyle: "hit_category",
            contents: hitContents,
          },
        ],
      };

      workspace.updateToolbox(newToolbox);
      workspace.refreshToolboxSelection();
    }
  };

  const handleSave = async () => {
    if (workspaceRef.current) {
      const state = Blockly.serialization.workspaces.save(workspaceRef.current);
      console.log(state);
    } else {
      console.warn("Workspace is not ready.");
    }
  };

  return (
    <div>
      <div className="flex">
        {/* Sidebar: Part Navigation */}
        <div className="flex flex-col w-[120px] bg-gray-50 border-r border-gray-300">
          {["Part1", "Part2", "Part3", "Part4"].map((part, index) => (
            <button
              key={index}
              type="button"
              className="flex items-center gap-1 p-1 hover:bg-blue-100 transition-colors cursor-pointer"
              onClick={() => {
                console.log(`Part${index + 1} 클릭`);
                const workspace = workspaceRef.current;
                if (!workspace) return;

                const variableName = `Part${index + 1}`;

                // 변수 생성 (이미 있으면 기존 변수 반환)
                const variable = workspace
                  .getVariableMap()
                  .createVariable(variableName, "Part");

                // 1. 새 블록 생성
                const block = workspace.newBlock("variables_get");

                // 2. 변수 필드 설정
                block.setFieldValue(variable.getId(), "VAR"); // 내부적으로 이름도 설정됨

                // 3. 블록 초기화 및 렌더링
                block.initSvg();
                block.render();

                // 4. 위치 지정 (원하는 위치로)
                block.moveBy(50, 50);
              }}
            >
              <img src={part_icon} alt="part icon" className="w-5 h-5" />
              <span className="text-md font-medium">{part}</span>
            </button>
          ))}
        </div>
        <div
          id="blocklyDiv"
          ref={blocklyDivRef}
          className="w-full h-[480px] border border-gray-300"
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Workspace Data Save
        </button>

        <button
          type="button"
          onClick={addHitCategory}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          hit 카테고리 추가
        </button>
      </div>
    </div>
  );
}

export default ProjectPage;
