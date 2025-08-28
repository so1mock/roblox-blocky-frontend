import { useRef } from "react";

function BlockCodingPage({ id }: { id: string }) {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
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
