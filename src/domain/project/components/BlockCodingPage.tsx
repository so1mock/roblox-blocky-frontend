import { useRef } from "react";
import { useBlocklyUI } from "../hooks/useBlocklyUi";
import { addHitCategory } from "../blockly/utils/handleDynamicCategory";

function BlockCodingPage({ id }: { id: string }) {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const { workspaceRef, loading, error } = useBlocklyUI(blocklyDivRef, {
    useServer: true,
  });

  return (
    <div>
      {loading && <div className="text-gray-500 mb-2">블록 로딩 중...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div
        id="blocklyDiv"
        ref={blocklyDivRef}
        className="w-full h-[480px] border border-gray-300"
      />
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => {
            addHitCategory(workspaceRef.current);
          }}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          hit 카테고리 추가
        </button>
      </div>
    </div>
  );
}

export default BlockCodingPage;
