import * as Blockly from "blockly";

export const defineMathCategoryBlocks = () => {
  Blockly.Blocks["plus_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number"); // 첫 번째 피연산자
      this.appendDummyInput().appendField("+");
      this.appendValueInput("B").setCheck("Number"); // 두 번째 피연산자
      this.setOutput(true, "Number");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["minus_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number"); // 첫 번째 피연산자
      this.appendDummyInput().appendField("-");
      this.appendValueInput("B").setCheck("Number"); // 두 번째 피연산자
      this.setOutput(true, "Number");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["multify_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number"); // 첫 번째 피연산자
      this.appendDummyInput().appendField("*");
      this.appendValueInput("B").setCheck("Number"); // 두 번째 피연산자
      this.setOutput(true, "Number");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["divide_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number"); // 첫 번째 피연산자
      this.appendDummyInput().appendField("/");
      this.appendValueInput("B").setCheck("Number"); // 두 번째 피연산자
      this.setOutput(true, "Number");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["mod_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number"); // 첫 번째 피연산자
      this.appendDummyInput().appendField("%");
      this.appendValueInput("B").setCheck("Number"); // 두 번째 피연산자
      this.setOutput(true, "Number");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["random_block"] = {
    init: function () {
      this.appendValueInput("A").setCheck("Number"); // 첫 번째 피연산자
      this.appendDummyInput().appendField("에서");
      this.appendValueInput("B").setCheck("Number"); // 두 번째 피연산자
      this.appendDummyInput().appendField("사이의 랜덤 수");
      this.setOutput(true, "Number");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["vector_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("위치(")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField(")");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["cframe_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Cframe.new(")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField(")");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["look_vector_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Cframe from")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField("to")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["math_number"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "NUM");
      this.setOutput(true, "Number");
      this.setStyle("math_block");
    },
  };

  Blockly.Blocks["create_player_variable"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("플레이어 변수 생성")
        .appendField(new Blockly.FieldTextInput("playerName"), "VARIABLE_NAME");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("player_block");
    },
  };
};
