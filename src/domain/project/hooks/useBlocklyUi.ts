import * as Blockly from "blockly";
import { useEffect, useRef } from "react";
import { defineCustomBlocks } from "../blockly/blocks/defineBlocks";
import toolblox from "../blockly/toolbox/toolblox";
import { customTheme } from "../blockly/theme/customTheme";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    defineCustomBlocks();
    if (!blocklyDivRef.current) return;

    const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
      toolbox: toolblox,
      theme: customTheme,
    });

    workspaceRef.current = workspaceSvg;
  }, [blocklyDivRef]);

  return workspaceRef;
}
