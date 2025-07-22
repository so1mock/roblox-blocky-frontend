import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import toolboxCagories from "../blocky/toolbox";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { customTheme } from "../blocky/theme/customTheme";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    registerContinuousToolbox();
    if (!blocklyDivRef.current) return;

    const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
      toolbox: toolboxCagories,
      plugins: {
        flyoutsVerticalToolbox: "ContinuousFlyout",
        metricsManager: "ContinuousMetrics",
        toolbox: "ContinuousToolbox",
      },
      theme: customTheme,
    });

    workspaceRef.current = workspaceSvg;
  }, [blocklyDivRef]);

  return workspaceRef;
}
