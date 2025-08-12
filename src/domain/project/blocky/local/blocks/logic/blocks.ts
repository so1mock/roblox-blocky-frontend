import * as Blockly from "blockly";

export const defineLogicCategoryBlocks = () => {
  Blockly.Blocks["less_than_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField("<");
      this.appendValueInput("B").setCheck("Number");
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["less_equal_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField("<=");
      this.appendValueInput("B").setCheck("Number");
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["not_equal_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck(null);
      this.appendDummyInput().appendField("~=");
      this.appendValueInput("B").setCheck(null);
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["equal_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck(null);
      this.appendDummyInput().appendField("==");
      this.appendValueInput("B").setCheck(null);
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["true_block"] = {
    init: function () {
      this.appendDummyInput().appendField("True");
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["false_block"] = {
    init: function () {
      this.appendDummyInput().appendField("False");
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };

  // Blockly의 기본 logic_boolean 블록 추가
  Blockly.Blocks["logic_boolean"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["true", "TRUE"],
          ["false", "FALSE"]
        ]), "BOOL");
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["nil_block"] = {
    init: function () {
      this.appendDummyInput().appendField("nil");
      this.setOutput(true, "nil");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["or_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Boolean");
      this.appendDummyInput().appendField("OR");
      this.appendValueInput("B").setCheck("Boolean");
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["and_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Boolean");
      this.appendDummyInput().appendField("AND");
      this.appendValueInput("B").setCheck("Boolean");
      this.setOutput(true, "Boolean");
      this.setStyle("logic_block");
    },
  };
};
