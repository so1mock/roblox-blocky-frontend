import * as Blockly from "blockly";

export const defineVariableBlocks = () => {
  // 변수 설정 블록
  Blockly.Blocks["variables_set"] = {
    init: function () {
      this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("변수")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField("에");
      this.appendDummyInput().appendField("설정");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("variable_block");
      this.setTooltip("변수에 값을 설정합니다.");
      this.setHelpUrl("");
    },
  };

  // 변수 가져오기 블록
  Blockly.Blocks["variables_get"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("변수")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
      this.setOutput(true, null);
      this.setStyle("variable_block");
      this.setTooltip("변수의 값을 가져옵니다.");
      this.setHelpUrl("");
    },
  };

  // 동적 변수 가져오기 블록
  Blockly.Blocks["variables_get_dynamic"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("변수")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField("가져오기");
      this.setOutput(true, null);
      this.setStyle("variable_block");
      this.setTooltip("변수의 값을 동적으로 가져옵니다.");
      this.setHelpUrl("");
    },
  };
};
