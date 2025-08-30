import * as Blockly from "blockly";
import type {
  BlockScript,
  WorkspaceData,
  WorkspaceObject,
} from "../blockly/types/workspace";
import { getWorkspaceDataByPlaceId, saveBlockScript } from "../apis/workspace";

function BlockCodingHeader({
  placeId,
  setWorkspaceData,
  selectedScript,
  workspaceRef,
}: {
  placeId: string;
  setWorkspaceData: React.Dispatch<React.SetStateAction<WorkspaceData | null>>;
  selectedScript: WorkspaceObject | undefined;
  workspaceRef: React.RefObject<Blockly.Workspace | null>;
}) {
  const handleSave = async () => {
    if (!selectedScript) {
      alert("편집중인 블록 스크립트가 없습니다.");
      return;
    }
    if (!workspaceRef.current) {
      return;
    }
    try {
      const state = Blockly.serialization.workspaces.save(workspaceRef.current);
      const response = await saveBlockScript(
        selectedScript.uuid,
        state as BlockScript,
      );

      const data = await getWorkspaceDataByPlaceId(placeId);
      setWorkspaceData(data);
    } catch (e) {
      console.log(e);
    }
  };
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
