import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import toolboxCagories from "../blocky/toolbox/toolbox";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { customTheme } from "../blocky/theme/customTheme";
import { defineMathCategoryBlocks } from "../blocky/customBlocks/math/blocks";
import { defineLogicCategoryBlocks } from "../blocky/customBlocks/logic/blocks";
import { defineLoopCategoryBlocks } from "../blocky/customBlocks/loop/blocks";
import { defineControlCategoryBlocks } from "../blocky/customBlocks/control/blocks";
import { defineEventCategoryBlocks } from "../blocky/customBlocks/event/blocks";
import { defineServiceCategoryBlocks } from "../blocky/customBlocks/service/blocks";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    registerContinuousToolbox();
    defineMathCategoryBlocks();
    defineLogicCategoryBlocks();
    defineLoopCategoryBlocks();
    defineControlCategoryBlocks();
    defineEventCategoryBlocks();
    defineServiceCategoryBlocks();
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
