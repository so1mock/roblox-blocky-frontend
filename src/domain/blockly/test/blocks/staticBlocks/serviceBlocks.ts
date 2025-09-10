import * as Blockly from "blockly";

export const defineServiceCategoryBlocks = () => {
  Blockly.Blocks["runservice_block"] = {
    init: function () {
      this.appendDummyInput().appendField(
        "매 RunServiceFrame 마다 실행할 코드",
      );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("service_block");
    },
  };
};
