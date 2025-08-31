import * as Blockly from "blockly";
import type { BlockWithToolboxList } from "../../types/block";

export const defineServerBlocks = (blocks: BlockWithToolboxList) => {
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
          } else if (component.componentType === "FieldNumber") {
            const dummy = this.appendDummyInput();
            dummy.appendField(
              new Blockly.FieldNumber(component.value ?? 0),
              component.name,
            );
          } else if (component.componentType === "StatementInput") {
            const input = this.appendStatementInput(component.name);
            if (component.fieldText) input.appendField(component.fieldText);
          } else if (component.componentType === "FieldDropdown") {
            const dummy = this.appendDummyInput();
            const options = component.options.map(
              (option) => [option.name, option.value] as [string, string],
            );
            dummy.appendField(
              new Blockly.FieldDropdown(options),
              component.name,
            );
          }
        });

        if (block.definition.output) {
          this.setOutput(true, block.definition.output);
        }
        if (block.definition.previousStatement) {
          this.setPreviousStatement(true, null);
        }
        if (block.definition.nextStatement) {
          this.setNextStatement(true, null);
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
