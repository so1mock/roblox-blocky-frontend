import { useRef } from "react";
import { useBlocklyUI } from "../hooks/useBlocklyUi";

function BlockCodingPage({ id }: { id: string }) {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useBlocklyUI(blocklyDivRef);
  console.log(id);
  return (
    <div
      id="blocklyDiv"
      ref={blocklyDivRef}
      className="w-full h-[480px] border border-gray-300"
    />
  );
}

export default BlockCodingPage;
