import * as Blockly from "blockly";

export const defineHumanoidCategoryBlocks = () => {
  Blockly.Blocks["set_health"] = {
    init: function () {
      this.appendValueInput("TARGET").setCheck("Humanoid");
      this.appendDummyInput().appendField("체력을");
      this.appendValueInput("VALUE").setCheck("Number");
      this.appendDummyInput().appendField("로 설정하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setOutput(true, "Object");
      this.setStyle("humanoid_block");
    },
  };
};
