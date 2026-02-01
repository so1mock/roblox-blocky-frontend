import * as Blockly from "blockly";

export const defineColorCategoryBlocks = () => {
  Blockly.Blocks["color3_from_rgb"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("RGB(")
        .appendField(new Blockly.FieldNumber(255, 0, 255, 1), "R")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(255, 0, 255, 1), "G")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(255, 0, 255, 1), "B")
        .appendField(") 색 만들기");
      this.setOutput(true, "Color3");
      this.setStyle("color_block");
    },
  };
};
