import * as Blockly from "blockly";
import {
  ContinuousFlyout,
  registerContinuousToolbox,
} from "@blockly/continuous-toolbox";
import { useEffect, useRef } from "react";
import { defineCustomBlocks } from "../blockly/blocks/defineBlocks";
import toolblox from "../blockly/toolbox/toolblox";
import { customTheme } from "../blockly/theme/customTheme";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDivRef.current) return;
    defineCustomBlocks();
    registerContinuousToolbox();

    const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
      toolbox: toolblox,
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
