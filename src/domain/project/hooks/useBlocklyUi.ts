import * as Blockly from "blockly";
import { registerContinuousToolbox } from "@blockly/continuous-toolbox";
import { useEffect, useRef } from "react";
import { defineCustomBlocks } from "../blockly/blocks/defineBlocks";
import toolbox from "../blockly/toolbox/toolbox";
import { customTheme } from "../blockly/theme/customTheme";
import { registerVariableCallbacks } from "../blockly/utils/variableUtils";
import { setupBlockInputInitializer } from "../blockly/utils/blockInputInitializer";
import { getBlockList } from "../apis/block";
import { defineServerBlocks } from "../blockly/server/defineBlocks";
import { toolboxFromServer } from "../blockly/server/serverToolbox";
import { defineVariableBlocks } from "../blockly/blocks/blockDefinitions/variableBlockDefinitions";

export function useBlocklyUI(
  blocklyDivRef: React.RefObject<HTMLDivElement | null>,
  options: { useServer?: boolean } = { useServer: false },
) {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDivRef.current) return;
    registerContinuousToolbox(); // 플러그인 적용
    if (options.useServer) {
      // 서버 데이터로 로딩
      getBlockList()
        .then((blockListByCategory) => {
          // TODO: blockListByCategory 활용
          for (const blockList of blockListByCategory) {
            defineServerBlocks(blockList.blocks);
          }
          defineVariableBlocks(); // 변수 블록은 로컬에서 정의하기로

          const workspaceSvg = Blockly.inject(blocklyDivRef.current!, {
            toolbox: toolboxFromServer(blockListByCategory),
            plugins: {
              flyoutsVerticalToolbox: "ContinuousFlyout",
              metricsManager: "ContinuousMetrics",
              toolbox: "ContinuousToolbox",
            },
            theme: customTheme,
          });

          workspaceRef.current = workspaceSvg;

          // ✅ 변수 관련 콜백 등록
          registerVariableCallbacks(workspaceSvg);
          // ✅ 블록 초기 값 블록 생성 이벤트 등록
          setupBlockInputInitializer(workspaceSvg);
        })
        .catch((e) => {
          if (e) {
            console.log(e);
          }
        });
    } else {
      // 로컬 데이터로 로딩
      defineCustomBlocks();

      const workspaceSvg = Blockly.inject(blocklyDivRef.current, {
        toolbox: toolbox,
        plugins: {
          flyoutsVerticalToolbox: "ContinuousFlyout",
          metricsManager: "ContinuousMetrics",
          toolbox: "ContinuousToolbox",
        },
        theme: customTheme,
      });
      workspaceRef.current = workspaceSvg;
      // ✅ 변수 관련 콜백 등록
      registerVariableCallbacks(workspaceSvg);
      // ✅ 블록 초기 값 블록 생성 이벤트 등록
      setupBlockInputInitializer(workspaceSvg);
    }
  }, [blocklyDivRef]);

  return workspaceRef;
}
