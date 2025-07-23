import * as Blockly from "blockly";

export const defineLogicCategoryBlocks = () => {
  Blockly.Blocks["less_than_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField("<")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["less_equal_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField("<=")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["not_equal_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField("~=")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["equal_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField("==")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["true_block"] = {
    init: function () {
      this.appendDummyInput().appendField("True");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["false_block"] = {
    init: function () {
      this.appendDummyInput().appendField("False");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["nil_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField("==")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["or_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField("OR")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME");
      this.setStyle("logic_block");
    },
  };

  Blockly.Blocks["and_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME")
        .appendField("AND")
        .appendField(new Blockly.FieldNumber(0), "FIELD_NAME");
      this.setStyle("logic_block");
    },
  };
};
