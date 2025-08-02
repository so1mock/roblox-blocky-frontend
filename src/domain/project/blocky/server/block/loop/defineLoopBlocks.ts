import * as Blockly from "blockly";
import type { BlockWithToolboxList } from "../../../../types/block";

export const defineLoopBlocks = (blocks: BlockWithToolboxList) => {
  // 1. 등록
  blocks.forEach((block) => {
    Blockly.Blocks[block.type] = {
      init: function () {
        block.definition.components.forEach((component) => {
          if (component.componentType === "ValueInput") {
            const input = this.appendValueInput(component.name);
            if (component.check) input.setCheck(component.check);
          } else if (component.componentType === "DummyInput") {
            const dummy = this.appendDummyInput();
            if (component.fieldText) dummy.appendField(component.fieldText);
          } else if (component.componentType === "FieldInput") {
            const dummy = this.appendDummyInput();
            dummy.appendField(
              new Blockly.FieldTextInput(component.fieldValue ?? ""),
              component.name,
            );
          } else if (component.componentType === "FieldDropdown") {
            const dummy = this.appendDummyInput();
            const options = component.options.map(
              (option) => [option.name, option.value] as [string, string],
            );
            dummy.appendField(
              new Blockly.FieldDropdown(options),
              component.name,
            );
          } else if (component.componentType === "Component$StatementInput") {
            const statement = this.appendStatementInput(component.name);
            if (component.fieldText) statement.appendField(component.fieldText);
          }
        });

        if (block.definition.previousStatement !== undefined) {
          this.setPreviousStatement(block.definition.previousStatement, null);
        }
        if (block.definition.nextStatement !== undefined) {
          this.setNextStatement(block.definition.nextStatement, null);
        }
        if (block.definition.inputsInline !== undefined) {
          this.setInputsInline(block.definition.inputsInline);
        }
        if (block.definition.style) {
          this.setStyle(block.definition.style);
        }
      },
    };
  });
};
