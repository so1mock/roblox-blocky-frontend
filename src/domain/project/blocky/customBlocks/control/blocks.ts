import * as Blockly from "blockly";

export const defineControlCategoryBlocks = () => {
  Blockly.Blocks["if_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("만일")
        .appendField(new Blockly.FieldNumber(10, 1, Infinity, 1), "TIMES")
        .appendField("이라면");
      this.appendStatementInput("DO").appendField("do");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("control_block");
    },
  };

  Blockly.Blocks["stop_block"] = {
    init: function () {
      this.appendDummyInput().appendField("현재 스크립트 멈추기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("control_block");
    },
  };
};
