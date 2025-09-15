import * as Blockly from "blockly";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { useEffect, useRef, useState } from "react";
import { initTestBlocks } from "src/domain/blockly/test/blocks/blocks";
import { toolbox } from "src/domain/blockly/test/toolbox";
import { customTheme } from "src/domain/blockly/theme/customTheme";
import { registerVariableCallbacks } from "src/domain/blockly/utils/variableUtils";
import { setupBlockInputInitializer } from "src/domain/blockly/utils/blockInputInitializer";
import { getBlockList } from "../apis/block";
import { initBlocks } from "src/domain/blockly/blocks";
import { initToolbox } from "src/domain/blockly/toolbox";
import { defineVariableBlocks } from "src/domain/blockly/common/blocks";
import type { Toolbox } from "../types/block";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
  options: { useServer?: boolean } = { useServer: false },
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
      registerVariableCallbacks(workspaceSvg);
      setupBlockInputInitializer(workspaceSvg);
      setLoading(false);
    };

    if (options.useServer) {
      getBlockList()
        .then((blockListByCategory) => {
          for (const blockList of blockListByCategory) {
            initBlocks(blockList.blocks);
          }
          defineVariableBlocks(); // 변수 블록은 로컬에서 정의
          initWorkspace(initToolbox(blockListByCategory));
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
