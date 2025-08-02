import * as Blockly from "blockly";

export const defineLogicCategoryBlocks = () => {
  Blockly.Blocks["less_than_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number"); // ✅ Number로 수정
      this.appendDummyInput().appendField("<");
      this.appendValueInput("B").setCheck("Number"); // ✅ Number로 수정
      this.setOutput(true, "Boolean"); // 결과는 Boolean이 맞음
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["less_equal_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number"); // ✅ Number로 수정
      this.appendDummyInput().appendField("<=");
      this.appendValueInput("B").setCheck("Number"); // ✅ Number로 수정
      this.setOutput(true, "Boolean"); // 결과는 Boolean이 맞음
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["not_equal_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck(null); // ✅ Number로 수정
      this.appendDummyInput().appendField("~=");
      this.appendValueInput("B").setCheck(null); // ✅ Number로 수정
      this.setOutput(true, "Boolean"); // 결과는 Boolean이 맞음
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["equal_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck(null); // ✅ Number로 수정
      this.appendDummyInput().appendField("==");
      this.appendValueInput("B").setCheck(null); // ✅ Number로 수정
      this.setOutput(true, "Boolean"); // 결과는 Boolean이 맞음
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

  Blockly.Blocks["nil_block"] = {
    init: function () {
      this.appendDummyInput().appendField("nil");
      this.setOutput(true, "nil");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["or_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck(null); // ✅ Number로 수정
      this.appendDummyInput().appendField("OR");
      this.appendValueInput("B").setCheck(null); // ✅ Number로 수정
      this.setOutput(true, "Boolean"); // 결과는 Boolean이 맞음
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["and_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck(null); // ✅ Number로 수정
      this.appendDummyInput().appendField("AND");
      this.appendValueInput("B").setCheck(null); // ✅ Number로 수정
      this.setOutput(true, "Boolean"); // 결과는 Boolean이 맞음
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["logic_boolean"] = {
    init: function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ["참", "true"],
          ["거짓", "false"],
        ]),
        "BOOL",
      );
      this.setOutput(true, "Boolean"); // 결과는 Boolean이 맞음
      this.setStyle("logic_block");
    },
  };
};
