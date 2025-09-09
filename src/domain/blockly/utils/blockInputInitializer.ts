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
    if (block.type === "touched_block") {
      const input = block.getInput("HIT");
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
