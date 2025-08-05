import * as Blockly from "blockly";
import type { BlockListResponse } from "../../../../types/block";

export const defineVariableBlocks = (blockListResponse: BlockListResponse) => {
  blockListResponse.blocks.forEach((block) => {
    Blockly.Blocks[block.type] = {
      init: function () {
        // 기본 변수 블록 구조
        if (block.type.includes("set")) {
          this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("변수")
            .appendField(new Blockly.FieldVariable("item"), "VAR")
            .appendField("에");
          this.appendDummyInput().appendField("설정");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
        } else if (block.type.includes("get")) {
          this.appendDummyInput()
            .appendField("변수")
            .appendField(new Blockly.FieldVariable("item"), "VAR");
          this.setOutput(true, null);
        }

        this.setStyle("variable_block");
        this.setTooltip("변수 관련 블록입니다.");
        this.setHelpUrl("");
      },
    };
  });
};
