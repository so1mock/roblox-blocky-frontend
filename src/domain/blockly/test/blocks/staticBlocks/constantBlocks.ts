import * as Blockly from "blockly";

export const defineConstantCategoryBlocks = () => {
  Blockly.Blocks["character_constant"] = {
    init: function () {
      this.appendDummyInput().appendField("캐릭터");
      this.setOutput(true, "Character"); // 값 블럭으로 사용됨
      this.setColour(280);
    },
  };

  Blockly.Blocks["ekey_constant"] = {
    init: function () {
      this.appendDummyInput().appendField("EKey");
      this.setOutput(true, "Key"); // 값 블럭으로 사용됨
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
  Blockly.Blocks["player_constant"] = {
    init: function () {
      this.appendDummyInput().appendField("플레이어");
      this.setOutput(true, "Player"); // 값 블럭으로 사용됨
      this.setColour(280);
    },
  };
};
