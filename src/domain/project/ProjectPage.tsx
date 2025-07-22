import { useRef } from "react";
import { useBlocklyUI } from "./hooks/useBlocklyUI";

function ProjectPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  useBlocklyUI(blocklyDivRef);

  return (
    <div
      id="blocklyDiv"
      ref={blocklyDivRef}
      className="w-full h-[480px] border border-gray-300"
    />
  );
}

export default ProjectPage;
