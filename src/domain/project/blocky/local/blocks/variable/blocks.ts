import * as Blockly from "blockly";

export const defineVariableCategoryBlocks = () => {
  // Block for variable getter.
  Blockly.Blocks["variables_get_humanoid"] = {
    init: function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldVariable(
          "Humanoid",
          undefined,
          ["Humanoid"],
          "Humanoid",
        ),
      );
      this.setOutput(true, "Humanoid");
      this.setStyle("variable_block");
    },
  };

  // Block for variable setter.
  Blockly.Blocks["variables_set_humanoid"] = {
    init: function () {
      this.appendValueInput("NAME")
        .setCheck("Humanoid")
        .appendField("set")
        .appendField(
          new Blockly.FieldVariable(
            "Humanoid",
            undefined,
            ["Humanoid"],
            "Humanoid",
          ),
        )
        .appendField("to");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("variable_block");
      // 추가적인 설정이 있다면 여기에 계속 작성
    },
  };
};
