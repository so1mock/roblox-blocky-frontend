import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { customTheme } from "../blocky/theme/customTheme";
import { getBlockList } from "../apis/block";
import type { BlockListResponse } from "../types/block";
import { defineMathBlocks } from "../blocky/server/block/math/defineMathBlocks";
import { defineLogicBlocks } from "../blocky/server/block/logic/defineLogicBlocks";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const blockListByCategory: BlockListResponse[] = await getBlockList();

      // 1. 등록
      defineMathBlocks(blockListByCategory[0].blocks);
      // defineLogicBlocks(blockListByCategory[1].blocks);

      // 2. Toolbox 생성
      const toolboxFromServer = {
        kind: "categoryToolbox",
        contents: [
          {
            kind: "category",
            name: "수식", // 또는 서버에 따라 카테고리별 분류 가능
            categorystyle: "math_category",
            contents: blockListByCategory[0].blocks.map((block) => ({
              kind: block.toolBoxDefinition.kind,
              type: block.toolBoxDefinition.type,
              inputs: block.toolBoxDefinition.toolboxInputs,
            })),
          },
          // {
          //   kind: "category",
          //   name: "수식", // 또는 서버에 따라 카테고리별 분류 가능
          //   categorystyle: "math_category",
          //   contents: blockListByCategory[1].blocks.map((block) => ({
          //     kind: block.toolBoxDefinition.kind,
          //     type: block.toolBoxDefinition.type,
          //     inputs: block.toolBoxDefinition.toolboxInputs,
          //   })),
          // },
        ],
      };

      // 3. inject
      if (!blocklyDivRef.current) return;

      registerContinuousToolbox();

      const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
        toolbox: toolboxFromServer,
        plugins: {
          flyoutsVerticalToolbox: "ContinuousFlyout",
          metricsManager: "ContinuousMetrics",
          toolbox: "ContinuousToolbox",
        },
        theme: customTheme,
      });

      workspaceRef.current = workspaceSvg;
    };

    fetchData();
  }, [blocklyDivRef]);

  return workspaceRef;
}
