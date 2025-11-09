import * as Blockly from "blockly";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { useEffect, useRef, useState } from "react";
import { initTestBlocks } from "@blockly/test/blocks/blocks";
import { toolbox } from "@blockly/test/toolbox";
import { customTheme } from "@blockly/theme/customTheme";
import { registerVariableCallbacks } from "@blockly/utils/variableUtils";
import {
  // registerVariableListener,
  setupBlockInputInitializer,
} from "@blockly/utils/blockInputInitializer";
import { getBlockList } from "../apis/block";
import { initBlocks } from "@blockly/blocks";
import { initToolbox } from "@blockly/toolbox";
import { defineVariableBlocks } from "src/domain/blockly/common/blocks";
import type { Toolbox } from "../types/block";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
  options: { useServer?: boolean } = { useServer: false },
  onOpenVariableModal: () => void,
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blocklyDivRef.current) return;

    registerContinuousToolbox();
    setLoading(true);
    setError(null);

    const initWorkspace = (toolboxConfig: Toolbox) => {
      const workspaceSvg = Blockly.inject(blocklyDivRef.current!, {
        toolbox: toolboxConfig,
        plugins: {
          flyoutsVerticalToolbox: "ContinuousFlyout",
          metricsManager: "ContinuousMetrics",
          toolbox: "ContinuousToolbox",
        },
        theme: customTheme,
      });
      workspaceRef.current = workspaceSvg;
      // 주입 후 스타일 추가
      const flyoutElement = blocklyDivRef.current?.querySelector(
        ".blocklyFlyout.blocklyToolboxFlyout",
      ) as HTMLElement;
      if (flyoutElement) {
        flyoutElement.style.border = "2px solid #ddd";
        // 또는
        flyoutElement.style.borderLeft = "2px solid #ddd";
      }

      // 변수 콜백 등록 (모달 열기 함수 전달)
      registerVariableCallbacks(workspaceSvg, onOpenVariableModal);
      setupBlockInputInitializer(workspaceSvg);
      // registerVariableListener(workspaceSvg);
      setLoading(false);
    };

    if (options.useServer) {
      getBlockList()
        .then((blockListsByCategory) => {
          for (const blockListByCategory of blockListsByCategory) {
            initBlocks(blockListByCategory.blocks);
          }
          defineVariableBlocks(); // 변수 블록은 로컬에서 정의
          initWorkspace(initToolbox(blockListsByCategory));
        })
        .catch((e) => {
          console.error("서버 블록 로딩 실패:", e);
          setError("서버 블록 로딩 실패.");
        });
    } else {
      initTestBlocks();
      initWorkspace(toolbox);
    }
  }, [blocklyDivRef]);

  return { workspaceRef, loading, error };
}
