import * as Blockly from "blockly";

export const defineLoopCategoryBlocks = () => {
  Blockly.Blocks["wait_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(1, 0, Infinity, 0.1), "SECONDS")
        .appendField("초 기다리기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("loop_block");
    },
  };

  Blockly.Blocks["repeat_times_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(10, 1, Infinity, 1), "TIMES")
        .appendField("번 반복하기");
      this.appendStatementInput("DO").appendField("do");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("loop_block");
    },
  };

  Blockly.Blocks["infinte_repeat_block"] = {
    init: function () {
      this.appendDummyInput().appendField("무한 반복하기");
      this.appendStatementInput("DO").appendField("do");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("loop_block");
    },
  };

  Blockly.Blocks["repeat_until_block"] = {
    init: function () {
      this.appendValueInput("CONDITION")
        .setCheck("Boolean")
        .appendField("조건을 만족할 때 까지 반복");
      this.appendStatementInput("DO").appendField("do");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("loop_block");
    },
  };

  Blockly.Blocks["continue_block"] = {
    init: function () {
      this.appendDummyInput().appendField("이번 반복 건너띄기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("loop_block");
    },
  };

  Blockly.Blocks["break_block"] = {
    init: function () {
      this.appendDummyInput().appendField("반복 중단하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("loop_block");
    },
  };
};
