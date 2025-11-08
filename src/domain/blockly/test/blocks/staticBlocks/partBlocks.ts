import * as Blockly from "blockly";

export const definePartCategoryBlocks = () => {
  Blockly.Blocks["part_block"] = {
    init: function () {
      this.appendDummyInput("PART_INPUT").appendField(
        new Blockly.FieldLabelSerializable("파트"),
        "PART_NAME",
      );
      this.setOutput(true, "Part");
      this.setStyle("part_block");
    },

    /**
     * 파라미터로 블록에 이름을 설정할 수 있도록 custom mutation 처리
     */
    mutationToDom: function () {
      const container = document.createElement("mutation");
      container.setAttribute("name", this.getFieldValue("PART_NAME"));
      return container;
    },

    domToMutation: function (xmlElement: Element) {
      const name = xmlElement.getAttribute("name");
      if (name) {
        this.setFieldValue(name, "PART_NAME");
      }
    },
  };

  Blockly.Blocks["set_transparency"] = {
    init: function () {
      this.appendValueInput("CONDITION").setCheck("Part");
      this.appendDummyInput().appendField("의 투명도");
      this.appendValueInput("VALUE").setCheck("Number");
      this.appendDummyInput().appendField("로 설정하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("part_block");
    },
  };

  Blockly.Blocks["set_can_collide"] = {
    init: function () {
      this.appendValueInput("CONDITION").setCheck("Part");
      this.appendDummyInput().appendField("이(가) 다른 것과 부딪히게");
      this.appendValueInput("VALUE").setCheck("Boolean");
      this.appendDummyInput().appendField("하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("part_block");
    },
  };

  Blockly.Blocks["set_color"] = {
    init: function () {
      this.appendValueInput("TARGET").setCheck("Part");
      this.appendDummyInput().appendField("의 색을");
      this.appendValueInput("COLOR").setCheck("Color3");
      this.appendDummyInput().appendField("로 설정하기");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("part_block");
    },
  };
};
