import { useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { customTheme } from "../blocky/theme/customTheme";
import { getBlockList } from "../apis/block";
import type { BlockListResponse } from "../types/block";
import { defineMathBlocks } from "../blocky/server/block/math/defineMathBlocks";
import { defineLogicBlocks } from "../blocky/server/block/logic/defineLogicBlocks";
import { defineControlBlocks } from "../blocky/server/block/control/defineControlBlocks";
import { defineLoopBlocks } from "../blocky/server/block/loop/defineLoopBlocks";
import { toolboxFromServer } from "../blocky/server/toolbox";
import { defineLocalBlocks } from "../blocky/local/blocks/defineLocalBlocks";
import toolbox from "../blocky/local/toolbox/toolbox";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
  options?: { useServer?: boolean },
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    const fetchAndInitialize = async () => {
      let blockListByCategory: BlockListResponse[];
      if (options?.useServer === true) {
        // 0. 서버로부터 데이터 받아오기
        blockListByCategory = await getBlockList();

        // 1. 블럭 등록
        defineMathBlocks(blockListByCategory[0].blocks);
        defineLogicBlocks(blockListByCategory[1].blocks);
        defineControlBlocks(blockListByCategory[2].blocks);
        defineLoopBlocks(blockListByCategory[3].blocks);

        if (!blocklyDivRef.current) return;

        registerContinuousToolbox();

        // 2. 블럭 주입
        const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
          toolbox: toolboxFromServer(blockListByCategory), // 툴 박스 정의
          plugins: {
            flyoutsVerticalToolbox: "ContinuousFlyout",
            metricsManager: "ContinuousMetrics",
            toolbox: "ContinuousToolbox",
          },
          theme: customTheme,
        });

        // 변수 생성 버튼 콜백 등록
        workspaceSvg.registerButtonCallback("CREATE_VARIABLE", () => {
          Blockly.Variables.createVariableButtonHandler(workspaceSvg);
        });

        workspaceRef.current = workspaceSvg;
      } else {
        // 1. local 데이터로 렌더링
        defineLocalBlocks();

        if (!blocklyDivRef.current) return;

        registerContinuousToolbox();

        // 2. 블럭 주입
        const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
          toolbox: toolbox, // 툴 박스 정의
          plugins: {
            flyoutsVerticalToolbox: "ContinuousFlyout",
            metricsManager: "ContinuousMetrics",
            toolbox: "ContinuousToolbox",
          },
          theme: customTheme,
        });

        // 변수 생성 버튼 콜백 등록
        workspaceSvg.registerButtonCallback("CREATE_VARIABLE", () => {
          Blockly.Variables.createVariableButtonHandler(workspaceSvg);
        });

        workspaceRef.current = workspaceSvg;
      }
    };

    fetchAndInitialize();
  }, [blocklyDivRef]);

  return workspaceRef;
}
