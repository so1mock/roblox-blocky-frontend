import * as Blockly from "blockly";

export const definePartCategoryBlocks = () => {
  Blockly.Blocks["part_block"] = {
    init: function () {
      this.appendDummyInput("PART_INPUT").appendField(
        new Blockly.FieldLabelSerializable("파트"),
        "PART_NAME",
      );
      this.setOutput(true, "Part");
      this.setColour(280);
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
};
