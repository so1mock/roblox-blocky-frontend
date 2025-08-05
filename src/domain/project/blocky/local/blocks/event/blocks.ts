import * as Blockly from "blockly";

export const defineEventCategoryBlocks = () => {
  Blockly.Blocks["touched_block"] = {
    init: function () {
      this.appendValueInput("CONDITION").setCheck("Part");
      this.appendDummyInput()
        .appendField("에 닿았다면")
        .appendField(
          new Blockly.FieldVariable("hit", undefined, ["Part"], "Part"),
        );
      this.appendStatementInput("DO").appendField("실행");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("event_block");
    },
  };

  Blockly.Blocks["player_constant"] = {
    init: function () {
      this.appendDummyInput().appendField("플레이어");
      this.setOutput(true, "Player"); // 값 블럭으로 사용됨
      this.setColour(280);
    },
  };

  Blockly.Blocks["player_added_block"] = {
    init: function () {
      this.appendValueInput("PLAYER").setCheck("Player");
      this.appendDummyInput().appendField("가 게임에 접속했다면");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendStatementInput("DO").appendField("실행");
      this.setStyle("event_block");
    },
  };

  Blockly.Blocks["player_remove_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("플레이어가 게임에서 나갔다면")
        .appendField(new Blockly.FieldVariable("player"));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("event_block");
    },
  };

  Blockly.Blocks["key_input_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("키를 입력 했을 때")
        .appendField(new Blockly.FieldVariable("E Key"));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("event_block");
    },
  };
};
