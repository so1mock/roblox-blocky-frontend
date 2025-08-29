import * as Blockly from "blockly";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { useEffect, useRef } from "react";
import { defineCustomBlocks } from "../blockly/blocks/defineBlocks";
import toolbox from "../blockly/toolbox/toolbox";
import { customTheme } from "../blockly/theme/customTheme";
import { registerVariableCallbacks } from "../blockly/utils/variableUtils";
import { setupBlockInputInitializer } from "../blockly/utils/blockInputInitializer";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDivRef.current) return;
    defineCustomBlocks();
    registerContinuousToolbox();

    const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
      toolbox: toolbox,
      plugins: {
        flyoutsVerticalToolbox: "ContinuousFlyout",
        metricsManager: "ContinuousMetrics",
        toolbox: "ContinuousToolbox",
      },
      theme: customTheme,
    });

    // ✅ 변수 관련 콜백 등록
    registerVariableCallbacks(workspaceSvg);
    // ✅ 블록 초기 값 블록 생성 이벤트 등록
    setupBlockInputInitializer(workspaceSvg);

    workspaceRef.current = workspaceSvg;
  }, [blocklyDivRef]);

  return workspaceRef;
}
