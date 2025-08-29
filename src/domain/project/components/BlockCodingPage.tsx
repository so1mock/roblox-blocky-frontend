import { useRef } from "react";
import { useBlocklyUI } from "../hooks/useBlocklyUi";
import { addHitCategory } from "../blockly/utils/handleDynamicCategory";
import WorkspaceExploerer from "./WorkspaceExploerer";

function BlockCodingPage({ id: placeId }: { id: string }) {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const { workspaceRef, loading, error } = useBlocklyUI(blocklyDivRef, {
    useServer: true,
  });

  return (
    <div className="flex bg-gray-100 h-screen">
      {/* 왼쪽 사이드바 - 워크스페이스 탐색기 */}
      <aside className="w-80 bg-white border-r border-gray-200">
        <WorkspaceExploerer />
      </aside>
      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}
        <header className="flex gap-2 bg-white py-4 px-4">
          <button
            type="button"
            onClick={() => {
              addHitCategory(workspaceRef.current);
            }}
            className="px-4 py-2 bg-blue-400 text-black font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            hit 카테고리 추가
          </button>
        </header>
        {/* 블록 조립 */}
        <div className="flex-1 p-4">
          {loading && <div className="text-gray-500 mb-2">블록 로딩 중...</div>}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div
            id="blocklyDiv"
            ref={blocklyDivRef}
            className="w-full h-full rounded-xl border border-gray-200 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default BlockCodingPage;
