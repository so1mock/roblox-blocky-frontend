import * as Blockly from "blockly";

export const defineEventCategoryBlocks = () => {
  Blockly.Blocks["touched_block"] = {
    init: function () {
      this.appendValueInput("CONDITION").setCheck("Part");
      this.appendDummyInput().appendField("에 닿았다면");
      this.appendValueInput("HIT").setCheck("Part");
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

  Blockly.Blocks["hit_constant"] = {
    init: function () {
      this.appendDummyInput().appendField("충돌한 파트");
      this.setOutput(true, "Part"); // 값 블럭으로 사용됨
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
      this.appendValueInput("PLAYER").setCheck("Player");
      this.appendDummyInput().appendField("가 게임을 나갔다면");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendStatementInput("DO").appendField("실행");
      this.setStyle("event_block");
    },
  };

  Blockly.Blocks["key_input_block"] = {
    init: function () {
      this.appendValueInput("Ekey").setCheck("Key");
      this.appendDummyInput().appendField("키를 입력 했을 때");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.appendStatementInput("DO").appendField("실행");
      this.setStyle("event_block");
    },
  };

  Blockly.Blocks["ekey_constant"] = {
    init: function () {
      this.appendDummyInput().appendField("EKey");
      this.setOutput(true, "Key"); // 값 블럭으로 사용됨
      this.setColour(280);
    },
  };
};
