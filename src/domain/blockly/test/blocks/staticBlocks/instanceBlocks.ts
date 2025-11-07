import * as Blockly from "blockly";

export const defineInstanceCategoryBlocks = () => {
  Blockly.Blocks["parent_block"] = {
    init: function () {
      this.appendValueInput("CONDITION").setCheck([
        "Instance",
        "Part",
        "Script",
      ]);
      this.appendDummyInput().appendField("의 부모");
      this.setOutput(true, "Instance");
      this.setStyle("instance_block");
    },
  };

  Blockly.Blocks["find_first_Child_block"] = {
    init: function () {
      this.appendValueInput("PARENT").setCheck(["Instance", "Part"]);
      this.appendDummyInput()
        .appendField("에서 이름이")
        .appendField(new Blockly.FieldTextInput("ChildName"), "CHILD_NAME")
        .appendField("인 하위 객체 찾기");
      this.setOutput(true, "Instance");
      this.setStyle("instance_block");
    },
  };

  Blockly.Blocks["wait_for_child_block"] = {
    init: function () {
      this.appendValueInput("PARENT").setCheck(["Instance", "Part"]);
      this.appendDummyInput()
        .appendField("에서 이름이")
        .appendField(new Blockly.FieldTextInput("ChildName"), "CHILD_NAME")
        .appendField("인 하위 객체가 생길 때까지 기다리기");
      this.setOutput(true, "Instance");
      this.setStyle("instance_block");
    },
  };
};
