import * as Blockly from "blockly";
import { useEffect, useRef } from "react";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    let workspaceSvg;
    if (blocklyDivRef.current)
      workspaceSvg = Blockly.inject(blocklyDivRef.current);
  }, [blocklyDivRef]);

  return workspaceRef;
}
