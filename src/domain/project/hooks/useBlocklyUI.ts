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
import { hitContents } from "../blocky/local/toolbox/categories/hitContents";

// 자료형 선택이 가능한 변수 생성 함수
const createTypedVariable = (workspace: Blockly.WorkspaceSvg) => {
  const variableName = window.prompt("변수 이름을 입력하세요:");
  if (!variableName) return;

  const variableType = window.prompt(
    "변수 타입을 선택하세요:\n" +
      "1. String (문자열)\n" +
      "2. Number (숫자)\n" +
      "3. Boolean (불린)\n" +
      "4. Array (배열)\n" +
      "5. Object (객체)\n" +
      "\n숫자를 입력하세요 (1-5):",
  );

  const typeMap: { [key: string]: string } = {
    "1": "String",
    "2": "Number",
    "3": "Boolean",
    "4": "Array",
    "5": "Object",
  };

  const selectedType = typeMap[variableType || "1"] || "String";

  // 변수를 선택된 타입으로 생성
  const variable = workspace
    .getVariableMap()
    .createVariable(variableName, selectedType);

  if (variable) {
    // 생성된 변수의 타입 정보를 저장 (커스텀 속성)
    (variable as any).blocklyType = selectedType;

    // 툴박스 새로고침
    workspace.refreshToolboxSelection();

    console.log(
      `변수 "${variableName}"이 ${selectedType} 타입으로 생성되었습니다.`,
    );
    console.log("변수 ID:", variable.getId());
    console.log("변수 정보:", variable);
    console.log("현재 워크스페이스의 모든 변수:", workspace.getAllVariables());
  } else {
    console.error("변수 생성에 실패했습니다.");
  }
};

function setupAutoConnect(workspace: Blockly.WorkspaceSvg) {
  workspace.addChangeListener((event) => {
    // 블록 생성, 또는 블록 이동 이벤트 감지 시
    if (
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_MOVE
    ) {
      connectPlayerConstantToEventBlock(workspace);
    }
  });
}

function connectPlayerConstantToEventBlock(workspace: Blockly.WorkspaceSvg) {
  // 모든 player_added_block 탐색
  workspace.getAllBlocks().forEach((block) => {
    if (block.type === "player_added_block") {
      const input = block.getInput("PLAYER");
      if (input && input.connection && !input.connection.isConnected()) {
        // 새 player_constant 블록 생성
        const playerConstBlock = workspace.newBlock("player_constant");
        playerConstBlock.initSvg();
        playerConstBlock.render();

        // 연결
        input.connection.connect(playerConstBlock.outputConnection);
      }
    }
  });
}

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
          createTypedVariable(workspaceSvg);
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
          createTypedVariable(workspaceSvg);
        });

        setupAutoConnect(workspaceSvg);

        workspaceRef.current = workspaceSvg;
      }
    };

    fetchAndInitialize();
  }, [blocklyDivRef]);

  return workspaceRef;
}
