import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import toolboxCagories from "../blocky/toolbox";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";

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
      toolboxPosition: "top", // ← 이 부분이 핵심
    });

    workspaceRef.current = workspaceSvg;

    // 스크롤바 스타일 조정
    // setTimeout(() => {
    //   const svg = blocklyDivRef.current?.querySelector(
    //     ".blocklyScrollbarVertical",
    //   );
    //   const rect = blocklyDivRef.current?.querySelector(
    //     ".blocklyScrollbarBackground",
    //   );
    //   const rect2 = blocklyDivRef.current?.querySelector(
    //     ".blocklyScrollbarHandle",
    //   );

    //   if (svg) {
    //     svg.setAttribute("width", "11");
    //     svg.setAttribute("style", "transform: translate(155.5px, 2.5px)");
    //   }
    //   if (rect) {
    //     rect.setAttribute("width", "11");
    //   }
    //   if (rect2) {
    //     rect2.setAttribute("rx", "3");
    //     rect2.setAttribute("ry", "3");
    //     rect2.setAttribute("width", "6");
    //     rect2.setAttribute("height", "120");
    //   }
    // }, 100);
  }, [blocklyDivRef]);

  return workspaceRef;
}
