import * as Blockly from "blockly";

export const defineHitBlocks = () => {
  Blockly.Blocks["get_character_from_hit"] = {
    init: function () {
      this.appendValueInput("hitPart").setCheck("Part");
      this.appendDummyInput().appendField("에충돌한 캐릭터 가져오기"); // 블럭에 표시될 텍스트
      this.appendValueInput("CHARACTER").setCheck("Character");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("hit_block"); // 미리 정의한 hit_block 스타일 사용
      this.setTooltip("충돌한 파트에서 캐릭터를 반환합니다.");
      this.setHelpUrl("");
    },
  };
};
