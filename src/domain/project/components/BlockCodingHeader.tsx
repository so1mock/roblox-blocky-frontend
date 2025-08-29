import type { WorkspaceObject } from "../blockly/types/workspace";

function BlockCodingHeader({
  selectedScript,
}: {
  selectedScript: WorkspaceObject | undefined;
}) {
  const handleSave = () => {};
  return (
    <header className="flex justify-between gap-2 bg-white py-4 px-4">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-medium text-gray-900">블록 편집기</h2>
        {selectedScript && (
          <span className="text-sm text-gray-600">
            편집 중: {selectedScript.name}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 font-semibold rounded transition-colors bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          저장
        </button>
      </div>
    </header>
  );
}

export default BlockCodingHeader;
