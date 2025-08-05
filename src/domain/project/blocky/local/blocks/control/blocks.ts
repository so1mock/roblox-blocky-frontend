import * as Blockly from "blockly";

export const defineControlCategoryBlocks = () => {
  Blockly.Blocks["if_block"] = {
    init: function () {
      this.appendDummyInput().appendField("만약");
      this.appendValueInput("CONDITION").setCheck("Object");
      this.appendDummyInput().appendField("이면");
      this.appendStatementInput("DO").appendField("실행");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("control_block");
    },
  };

  Blockly.Blocks["if_else_block"] = {
    init: function () {
      this.appendDummyInput().appendField("만약");
      this.appendValueInput("CONDITION").setCheck("Boolean");
      this.appendDummyInput().appendField("이면");
      this.appendStatementInput("DO").appendField("실행");
      this.appendDummyInput().appendField("아니면");
      this.appendStatementInput("ELSE").appendField("실행");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("control_block");
    },
  };

  Blockly.Blocks["stop_block"] = {
    init: function () {
      this.appendDummyInput().appendField("현재 스크립트 멈추기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(false, null); // 멈추기 후에는 다른 블록이 실행되지 않음
      this.setStyle("control_block");
    },
  };
};
