import * as Blockly from "blockly";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { useEffect, useRef, useState } from "react";
import { defineCustomBlocks } from "src/domain/blockly/blocks/defineBlocks";
import toolbox from "src/domain/blockly/toolbox/toolbox";
import { customTheme } from "src/domain/blockly/theme/customTheme";
import { registerVariableCallbacks } from "src/domain/blockly/utils/variableUtils";
import { setupBlockInputInitializer } from "src/domain/blockly/utils/blockInputInitializer";
import { getBlockList } from "../apis/block";
import { defineServerBlocks } from "src/domain/blockly/server/defineBlocks";
import { toolboxFromServer } from "src/domain/blockly/server/serverToolbox";
import { defineVariableBlocks } from "src/domain/blockly/blocks/blockDefinitions/variableBlockDefinitions";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
  options: { useServer?: boolean } = { useServer: true },
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blocklyDivRef.current) return;

    registerContinuousToolbox();
    setLoading(true);
    setError(null);

    const initWorkspace = (toolboxConfig: any) => {
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
            defineServerBlocks(blockList.blocks);
          }
          defineVariableBlocks(); // 변수 블록은 로컬에서 정의
          initWorkspace(toolboxFromServer(blockListByCategory));
        })
        .catch((e) => {
          console.error("서버 블록 로딩 실패:", e);
          setError("서버 블록 로딩 실패.");
        });
    } else {
      defineCustomBlocks();
      initWorkspace(toolbox);
    }
  }, [blocklyDivRef]);

  return { workspaceRef, loading, error };
}
