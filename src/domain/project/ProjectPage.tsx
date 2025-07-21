import { useRef } from "react";
import * as Blockly from "blockly";
import { useBlocklyUI } from "./hooks/useBlocklyUI";
import rectangleBlue from "../assets/rectangle-blue.png";
import { flyoutToolbox } from "./blocky/toolbox";

function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);

  const workspaceRef = useBlocklyUI(blocklyDivRef);

  return (
    <div>
      <nav className="grid grid-cols-3 gap-2 w-max m-4">
        <button className="flex items-center py-2 pr-10 pl-2 bg-[#EBF0FF] rounded-xl cursor-pointer">
          <img src={rectangleBlue} alt="Rectangle Blue" />
          <span className="pl-3 text-lg font-bold">수식</span>
        </button>
        <button className="flex items-center py-2 pr-10 pl-2 bg-[#EBF0FF] rounded-xl cursor-pointer">
          <img src={rectangleBlue} alt="Rectangle Blue" />
          <span className="pl-3 text-lg font-bold">수식</span>
        </button>
        <button className="flex items-center py-2 pr-10 pl-2 bg-[#EBF0FF] rounded-xl cursor-pointer">
          <img src={rectangleBlue} alt="Rectangle Blue" />
          <span className="pl-3 text-lg font-bold">수식</span>
        </button>
        <button
          className="flex items-center py-2 pr-10 pl-2 bg-[#EBF0FF] rounded-xl cursor-pointer"
          onClick={() => {
            console.log(workspaceRef.current);
          }}
        >
          <img src={rectangleBlue} alt="Rectangle Blue" />
          <span className="pl-3 text-lg font-bold">수식</span>
        </button>
      </nav>
      <div
        id="blocklyDiv"
        ref={blocklyDivRef}
        className="w-full h-[480px] border border-gray-300"
      />
    </div>
  );
}

export default ProjectPage;
