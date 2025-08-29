// workspaceConnections.ts
import * as Blockly from "blockly";

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

export function setupBlockInputInitializer(workspace: Blockly.WorkspaceSvg) {
  workspace.addChangeListener((event) => {
    if (
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_MOVE
    ) {
      attachPlayerConstantBlock(workspace);
      attachPartConstantBlock(workspace);
      attachKeyConstantBlock(workspace);
    }
  });
}
