import * as Blockly from "blockly";
import { useEffect, useRef, useState } from "react";
import { useBlocklyUI } from "../hooks/useBlocklyUi";
import WorkspaceExploerer from "../workspace/components/WorkspaceExplorer";
import BlockCodingHeader from "./BlockCodingHeader";
import {
  getLastUpdatedMyPlaceTime,
  getLastUpdatedPlaceTime,
  getStudentWorkspaceDataByPlaceId,
  getWorkspaceDataByPlaceId,
} from "../workspace/apis/workspace";
import { useWorkspaceDataStore } from "../workspace/stores/useWorkspaceDataStore";
import VariableCreateModal from "./VariableCreateModal";
import { useAlertModal } from "@common/hooks/useAlertModal";
import AlertModal from "@common/components/AlertModal";

function BlockCodingPage({
  placeId,
  studentId,
  readOnly = false,
}: {
  placeId: string;
  studentId?: string;
  readOnly?: boolean;
}) {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const [isVariableModalOpen, setIsVariableModalOpen] = useState(false);
  const { workspaceRef, loading, error } = useBlocklyUI(
    blocklyDivRef,
    {
      useServer: true,
      readOnly,
    },
    () => {
      setIsVariableModalOpen(true);
    },
  );
  const { setWorkspaceData, selectedScript } = useWorkspaceDataStore();
  const { isOpen, config, showAlert, closeAlert } = useAlertModal();

  const handleVariableConfirm = (variableName: string) => {
    if (!workspaceRef.current) return;

    // 변수 생성
    const variable = workspaceRef.current
      .getVariableMap()
      .createVariable(variableName);

    if (variable) {
      // 툴박스 새로고침
      workspaceRef.current.refreshToolboxSelection();
    }

    // 모달 닫기
    setIsVariableModalOpen(false);
  };

  useEffect(() => {
    if (selectedScript === undefined) return;

    if (!workspaceRef.current) return;
    workspaceRef.current.clear();
    let blockState;
    if (selectedScript.blockScript) {
      if (typeof selectedScript.blockScript == "string") {
        blockState = JSON.parse(selectedScript.blockScript);
      } else {
        blockState = selectedScript.blockScript;
      }
    } else {
      // 블록 스크립트가 존재하지 않으면 기본 상태로 렌더링한다
      blockState = {
        version: 1, // Blockly의 현재 serialization 버전
        blocks: {
          languageVersion: 0,
          blocks: [],
        },
      };
    }
    Blockly.serialization.workspaces.load(blockState, workspaceRef.current);
  }, [selectedScript]);

  useEffect(() => {
    let intervalId: number;

    const fetchWorkspaceData = async () => {
      try {
        if (readOnly && studentId) {
          const currentWorkspaceData =
            useWorkspaceDataStore.getState().workspaceData;
          const lastUpdatedTime = await getLastUpdatedPlaceTime(
            studentId,
            placeId,
          );
          if (
            !currentWorkspaceData ||
            new Date(currentWorkspaceData.placeSummary.lastModifiedAt) <
              new Date(lastUpdatedTime)
          ) {
            const data = await getStudentWorkspaceDataByPlaceId(
              studentId,
              placeId,
            );
            setWorkspaceData(data);
          }
        } else {
          const currentWorkspaceData =
            useWorkspaceDataStore.getState().workspaceData;
          const lastUpdatedTime = await getLastUpdatedMyPlaceTime(placeId);
          if (
            !currentWorkspaceData ||
            new Date(currentWorkspaceData.placeSummary.lastModifiedAt) <
              new Date(lastUpdatedTime)
          ) {
            const data = await getWorkspaceDataByPlaceId(placeId);
            setWorkspaceData(data);
          }
        }
      } catch (err) {
        showAlert({
          title: "플레이스 정보 받아오기 실패",
          message: "플레이스 정보 받아오기 실패하였습니다",
          type: "warning",
        });
      }
    };

    if (placeId) {
      fetchWorkspaceData();
      intervalId = setInterval(fetchWorkspaceData, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [placeId]);

  return (
    <div className="flex bg-gray-100 h-screen">
      {/* 왼쪽 사이드바 - 워크스페이스 탐색기 */}
      <aside className="w-80 bg-white border-r border-gray-200">
        <WorkspaceExploerer placeId={placeId} readOnly={readOnly} />
      </aside>
      {/* 메인 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 헤더 */}

        <BlockCodingHeader
          placeId={placeId}
          selectedScript={selectedScript}
          workspaceRef={workspaceRef}
          readOnly={readOnly}
        />

        {/* 블록 조립 */}
        <div className="flex-1 p-4 relative">
          {!selectedScript && (
            <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex flex-col items-center justify-center z-90">
              <span className="text-gray-500 text-lg mb-2">
                스크립트를 선택해주세요
              </span>
              <span className="text-gray-400 text-sm">
                블록 편집을 하려면 Script 타입의 항목을 선택하세요
              </span>
            </div>
          )}

          {loading && <div className="text-gray-500 mb-2">블록 로딩 중...</div>}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div
            id="blocklyDiv"
            ref={blocklyDivRef}
            className="w-full h-full rounded-xl border border-gray-200 shadow-sm"
          />
        </div>
      </div>
      {/* 변수 생성 모달 */}
      <VariableCreateModal
        isOpen={isVariableModalOpen}
        onClose={() => {
          setIsVariableModalOpen(false);
        }}
        onConfirm={handleVariableConfirm}
      />
      <AlertModal
        isOpen={isOpen}
        onClose={closeAlert}
        title={config.title}
        message={config.message}
        type={config.type}
      />
    </div>
  );
}

export default BlockCodingPage;
