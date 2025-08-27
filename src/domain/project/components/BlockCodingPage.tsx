import { useRef } from "react";

function BlockCodingPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      id="blocklyDiv"
      ref={blocklyDivRef}
      className="w-full h-[480px] border border-gray-300"
    />
  );
}

export default BlockCodingPage;
