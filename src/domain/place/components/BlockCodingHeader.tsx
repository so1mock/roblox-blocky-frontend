import * as Blockly from "blockly";
import type {
  BlockScript,
  WorkspaceObject,
} from "../workspace/types/workspace";
import {
  getWorkspaceDataByPlaceId,
  saveBlockScript,
} from "../workspace/apis/workspace";
import { useState } from "react";
import BlockScriptToast from "./BlockScriptToast";
import { useWorkspaceDataStore } from "../workspace/stores/useWorkspaceDataStore";
import { useAlertModal } from "@common/hooks/useAlertModal";
import AlertModal from "@common/components/AlertModal";

function BlockCodingHeader({
  placeId,
  selectedScript,
  workspaceRef,
}: {
  placeId: string;
  selectedScript: WorkspaceObject | undefined;
  workspaceRef: React.RefObject<Blockly.Workspace | null>;
}) {
  const { setWorkspaceData } = useWorkspaceDataStore();
  const { isOpen, config, showAlert, closeAlert } = useAlertModal();
  const [convertedScript, setConvertedScript] = useState<string | null>(null);

  const handleBackToList = () => {
    // Blockly 정리를 위해 하드 네비게이션 사용
    window.location.href = "/student/my-places";
  };

  const handleSave = async () => {
    if (!selectedScript) {
      showAlert({
        title: "저장 불가",
        message: "편집중인 블록 스크립트가 없습니다.",
        type: "warning",
      });
      return;
    }
    if (!workspaceRef.current) {
      return;
    }
    try {
      const state = Blockly.serialization.workspaces.save(workspaceRef.current);
      const convertedScriptResponse = await saveBlockScript(
        placeId,
        selectedScript.uuid,
        state as BlockScript,
      );

      const data = await getWorkspaceDataByPlaceId(placeId);
      setWorkspaceData(data);

      setConvertedScript(convertedScriptResponse.content);
      setTimeout(() => {
        setConvertedScript(null);
      }, 2000);
    } catch (e) {
      showAlert({
        title: "저장 실패",
        message: "잘못된 블록 조립은 저장되지 않습니다.",
        type: "error",
      });
      console.log(e);
    }
  };
  return (
    <header className="flex justify-between gap-2 bg-white py-4 px-4">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={handleBackToList}
          className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>플레이스 목록</span>
        </button>
        <h2 className="text-lg font-medium text-rbDeepGrayText">블록 편집기</h2>
        {selectedScript && (
          <span className="text-sm text-rbGrayText">
            편집 중: {selectedScript.name}
          </span>
        )}
      </div>
      <div className="relative ">
        <button
          type="button"
          onClick={handleSave}
          className="relative px-4 py-2 font-semibold rounded transition-colors bg-blue-600 text-rbHoverText hover:bg-blue-700 cursor-pointer"
        >
          <span>저장</span>
        </button>
        <BlockScriptToast convertedScript={convertedScript} />
      </div>
      <AlertModal
        isOpen={isOpen}
        onClose={closeAlert}
        title={config.title}
        message={config.message}
        type={config.type}
      />
    </header>
  );
}

export default BlockCodingHeader;
