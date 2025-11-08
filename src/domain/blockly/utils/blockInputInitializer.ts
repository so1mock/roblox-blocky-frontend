// workspaceConnections.ts
import * as Blockly from "blockly";

/**
 * 플레이어 관련 블록에 `player_constant` 블록을 자동 연결합니다.
 *
 * `player_added_block`, `player_remove_block` 블록을 탐색하여
 * PLAYER 입력 슬롯이 비어 있으면, 새로운 `player_constant` 블록을 생성해 연결합니다.
 *
 * @param {Blockly.WorkspaceSvg} workspace - 블록이 존재하는 Blockly 워크스페이스
 */
function attachPlayerConstantBlock(workspace: Blockly.WorkspaceSvg) {
  workspace.getAllBlocks().forEach((block) => {
    if (
      block.type === "player_added_block" ||
      block.type === "player_remove_block"
    ) {
      const input = block.getInput("PLAYER");
      if (input && input.connection && !input.connection.isConnected()) {
        const playerConstBlock = workspace.newBlock("player_constant");
        playerConstBlock.initSvg();
        playerConstBlock.render();
        input.connection.connect(playerConstBlock.outputConnection);
      }
    }
  });
}

/**
 * 캐릭터 관련 블록에 `character_constant` 블록을 자동 연결합니다.
 *
 * `get_character_from_hit` 블록의 CHARACTER 입력 슬롯이 비어 있으면,
 * 새로운 `character_constant` 블록을 생성해 연결합니다.
 *
 * @param {Blockly.WorkspaceSvg} workspace - 블록이 존재하는 Blockly 워크스페이스
 */
function attachCharacterConstantBlock(workspace: Blockly.WorkspaceSvg) {
  workspace.getAllBlocks().forEach((block) => {
    if (block.type === "get_character_from_hit") {
      const input = block.getInput("CHARACTER");
      if (input && input.connection && !input.connection.isConnected()) {
        const playerConstBlock = workspace.newBlock("character_constant");
        playerConstBlock.initSvg();
        playerConstBlock.render();
        input.connection.connect(playerConstBlock.outputConnection);
      }
    }
  });
}

/**
 * 파트(Part) 관련 블록에 `hit_constant` 블록을 자동 연결합니다.
 *
 * `touched_block` 블록의 HIT 입력 슬롯이 비어 있으면,
 * 새로운 `hit_constant` 블록을 생성해 연결합니다.
 *
 * @param {Blockly.WorkspaceSvg} workspace - 블록이 존재하는 Blockly 워크스페이스
 */
function attachPartConstantBlock(workspace: Blockly.WorkspaceSvg) {
  workspace.getAllBlocks().forEach((block) => {
    if (block.type === "touched_event") {
      const input = block.getInput("hit");
      if (input && input.connection && !input.connection.isConnected()) {
        const hitConstBlock = workspace.newBlock("hit_constant");
        hitConstBlock.initSvg();
        hitConstBlock.render();
        input.connection.connect(hitConstBlock.outputConnection);
      }
    }
  });
}

/**
 * 키 입력 관련 블록에 `ekey_constant` 블록을 자동 연결합니다.
 *
 * `key_input_block` 블록의 Ekey 입력 슬롯이 비어 있으면,
 * 새로운 `ekey_constant` 블록을 생성해 연결합니다.
 *
 * @param {Blockly.WorkspaceSvg} workspace - 블록이 존재하는 Blockly 워크스페이스
 */
function attachKeyConstantBlock(workspace: Blockly.WorkspaceSvg) {
  workspace.getAllBlocks().forEach((block) => {
    if (block.type === "key_input_block") {
      const input = block.getInput("Ekey");
      if (input && input.connection && !input.connection.isConnected()) {
        const hitConstBlock = workspace.newBlock("ekey_constant");
        hitConstBlock.initSvg();
        hitConstBlock.render();
        input.connection.connect(hitConstBlock.outputConnection);
      }
    }
  });
}

/**
 * 블록 입력 초기화 리스너를 설정합니다.
 *
 * 워크스페이스에서 블록이 생성되거나 이동될 때(`BLOCK_CREATE`, `BLOCK_MOVE`),
 * 미리 정의된 attach 함수들을 실행하여 특정 입력 슬롯에 기본 상수 블록을 자동으로 연결합니다.
 *
 * - attachPlayerConstantBlock: PLAYER 입력 슬롯에 player_constant 블록 연결
 * - attachPartConstantBlock: HIT 입력 슬롯에 hit_constant 블록 연결
 * - attachKeyConstantBlock: Ekey 입력 슬롯에 ekey_constant 블록 연결
 * - attachCharacterConstantBlock: CHARACTER 입력 슬롯에 character_constant 블록 연결
 *
 * @param {Blockly.WorkspaceSvg} workspace - 블록이 존재하는 Blockly 워크스페이스
 *
 * @example
 * import { setupBlockInputInitializer } from "./initializer";
 *
 * const workspace = Blockly.inject("blocklyDiv", { toolbox });
 * setupBlockInputInitializer(workspace);
 *
 * // 이제 새로운 블록을 만들거나 옮기면,
 * // 비어 있는 입력 슬롯에 상수 블록이 자동으로 채워짐
 */
export function setupBlockInputInitializer(workspace: Blockly.WorkspaceSvg) {
  workspace.addChangeListener((event) => {
    if (
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_MOVE
    ) {
      attachPlayerConstantBlock(workspace);
      attachPartConstantBlock(workspace);
      attachKeyConstantBlock(workspace);
      attachCharacterConstantBlock(workspace);
    }
  });
}

// 변수 생성/삭제 이벤트 리스너
const updateVariableBlocks = (workspace: Blockly.WorkspaceSvg) => {
  // 현재 툴박스 가져오기
  const currentToolbox = workspace.getToolbox();
  if (!currentToolbox) return;

  // 타입 단언을 사용해서 toolboxDef 접근
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toolboxDef = (currentToolbox as any).toolboxDef_;
  if (!toolboxDef) return;

  const allVariables = workspace.getAllVariables();

  // 기존에 등록된 변수 블록들 추적
  const existingBlockTypes = new Set<string>();

  // 모든 변수에 대해 get/set 블록 생성
  allVariables.forEach((variable) => {
    const getBlockType = `variables_get_${variable.getId()}`;
    const setBlockType = `variables_set_${variable.getId()}`;

    existingBlockTypes.add(getBlockType);
    existingBlockTypes.add(setBlockType);

    // Get 블록이 없으면 생성
    if (!Blockly.Blocks[getBlockType]) {
      Blockly.Blocks[getBlockType] = {
        init: function () {
          this.appendDummyInput().appendField(variable.getName());
          this.setOutput(true, variable.getType() || null);
          this.setStyle("variable_block");
          this.setTooltip(
            `${variable.getType() ? variable.getType() + " 타입 " : ""}변수 "${variable.getName()}"의 값을 가져옵니다.`,
          );
          this.setHelpUrl("");
        },
        // 컨텍스트 메뉴 추가
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // customContextMenu: function (options: any[]) {
        //   // 변수 삭제 옵션
        //   options.push({
        //     text: "변수 삭제",
        //     enabled: true,
        //     callback: function () {
        //       workspace.deleteVariableById(variable.getId());
        //     },
        //   });
        // },
      };
    }

    // Set 블록이 없으면 생성
    if (!Blockly.Blocks[setBlockType]) {
      Blockly.Blocks[setBlockType] = {
        init: function () {
          this.appendValueInput("VALUE")
            .setCheck(variable.getType() || null)
            .appendField(variable.getName())
            .appendField("에");
          this.appendDummyInput().appendField("설정");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setStyle("variable_block");
          this.setTooltip(
            `${variable.getType() ? variable.getType() + " 타입 " : ""}변수 "${variable.getName()}"에 값을 설정합니다.`,
          );
          this.setHelpUrl("");
        },
        // 컨텍스트 메뉴 추가
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // customContextMenu: function (options: any[]) {
        //   // 변수 이름 변경 옵션
        //   options.push({
        //     text: "변수 이름 바꾸기",
        //     enabled: true,
        //     callback: function () {
        //       Blockly.Variables.renameVariable(workspace, variable);
        //     },
        //   });

        //   // 변수 삭제 옵션
        //   options.push({
        //     text: "변수 삭제",
        //     enabled: true,
        //     callback: function () {
        //       workspace.deleteVariableById(variable.getId());
        //     },
        //   });
        // },
      };
    }
  });

  // 변수 카테고리의 contents 생성
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variableContents: any[] = [];

  // 각 변수에 대한 블록 추가
  allVariables.forEach((variable) => {
    const getBlockType = `variables_get_${variable.getId()}`;
    const setBlockType = `variables_set_${variable.getId()}`;

    variableContents.push(
      {
        kind: "block",
        type: getBlockType,
        enabled: true,
      },
      {
        kind: "block",
        type: setBlockType,
        enabled: true,
      },
    );
  });

  // 깊은 복사를 통해 툴박스 구조 복제
  const updatedToolbox = JSON.parse(JSON.stringify(toolboxDef));

  // 변수 카테고리만 찾아서 업데이트
  if (updatedToolbox.contents && Array.isArray(updatedToolbox.contents)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatedToolbox.contents = updatedToolbox.contents.map((category: any) => {
      // 변수 카테고리를 찾아서 업데이트
      if (
        category.name === "변수" ||
        category.categorystyle === "variable_category"
      ) {
        return {
          ...category,
          contents: [
            {
              kind: "button",
              text: "새 변수 만들기",
              callbackKey: "CREATE_VARIABLE",
            },
            ...variableContents,
          ],
        };
      }
      // 다른 카테고리는 그대로 반환
      return category;
    });
  }

  // 툴박스 업데이트
  workspace.updateToolbox(updatedToolbox);
  workspace.refreshToolboxSelection();
};

// Workspace 변경 이벤트 리스너 등록
export const registerVariableListener = (workspace: Blockly.WorkspaceSvg) => {
  workspace.addChangeListener((event: Blockly.Events.Abstract) => {
    if (
      event.type === Blockly.Events.VAR_CREATE ||
      event.type === Blockly.Events.VAR_DELETE ||
      event.type === Blockly.Events.VAR_RENAME
    ) {
      updateVariableBlocks(workspace);
    }
  });
};
