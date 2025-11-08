import * as Blockly from "blockly";

export const defineEventCategoryBlocks = () => {
  Blockly.Blocks["touched_block"] = {
    init: function () {
      this.appendValueInput("Part").setCheck("Part");
      this.appendDummyInput().appendField("에 닿았다면");
      this.appendValueInput("HIT").setCheck("Part");
      this.appendStatementInput("DO").appendField("실행");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("event_block");
    },
  };
};
