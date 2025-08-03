import * as Blockly from "blockly";

export const defineVariableBlocks = () => {
  // 변수 설정 블록 (생성된 변수의 타입 자동 감지)
  Blockly.Blocks["variables_set"] = {
    init: function () {
      this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("변수")
        .appendField(new Blockly.FieldVariable("item"), "VAR")
        .appendField("에");
      this.appendDummyInput().appendField("설정");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setStyle("variable_block");
      this.setTooltip("변수에 값을 설정합니다.");
      this.setHelpUrl("");
    },
    onchange: function() {
      const workspace = this.workspace;
      if (!workspace) return;
      
      const varId = this.getFieldValue("VAR");
      const variable = workspace.getVariableById(varId);
      
      if (variable && variable.type && variable.type !== "") {
        // 변수의 실제 타입에 따라 입력값 타입 체크 설정
        const valueInput = this.getInput("VALUE");
        if (valueInput) {
          valueInput.setCheck(variable.type);
        }
        this.setTooltip(`${variable.type} 타입 변수 "${variable.name}"에 값을 설정합니다.`);
      } else {
        // 타입이 지정되지 않은 변수는 모든 타입 허용
        const valueInput = this.getInput("VALUE");
        if (valueInput) {
          valueInput.setCheck(null);
        }
        this.setTooltip("변수에 값을 설정합니다.");
      }
    }
  };

  // 변수 가져오기 블록 (생성된 변수의 타입 자동 감지)
  Blockly.Blocks["variables_get"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("변수")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
      this.setOutput(true, null);
      this.setStyle("variable_block");
      this.setTooltip("변수의 값을 가져옵니다.");
      this.setHelpUrl("");
    },
    onchange: function() {
      const workspace = this.workspace;
      if (!workspace) return;
      
      const varId = this.getFieldValue("VAR");
      const variable = workspace.getVariableById(varId);
      
      if (variable && variable.type && variable.type !== "") {
        // 변수의 실제 타입으로 출력 타입 설정
        this.setOutput(true, variable.type);
        this.setTooltip(`${variable.type} 타입 변수 "${variable.name}"의 값을 가져옵니다.`);
      } else {
        // 타입이 지정되지 않은 변수는 any 타입
        this.setOutput(true, null);
        this.setTooltip("변수의 값을 가져옵니다.");
      }
    }
  };

  // 자료형 확인 블록
  Blockly.Blocks["variables_type_check"] = {
    init: function () {
      this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("값");
      this.appendDummyInput()
        .appendField("이")
        .appendField(new Blockly.FieldDropdown([
          ["문자열", "String"],
          ["숫자", "Number"],
          ["불린", "Boolean"],
          ["배열", "Array"],
          ["객체", "Object"]
        ]), "TYPE")
        .appendField("타입인지 확인");
      this.setOutput(true, "Boolean");
      this.setStyle("variable_block");
      this.setTooltip("값이 특정 자료형인지 확인합니다.");
      this.setHelpUrl("");
    },
  };

  // 자료형 변환 블록
  Blockly.Blocks["variables_type_convert"] = {
    init: function () {
      this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("값");
      this.appendDummyInput()
        .appendField("을")
        .appendField(new Blockly.FieldDropdown([
          ["문자열", "String"],
          ["숫자", "Number"],
          ["불린", "Boolean"]
        ]), "TYPE")
        .appendField("로 변환");
      this.setOutput(true, "String");
      this.setStyle("variable_block");
      this.setTooltip("값을 다른 자료형으로 변환합니다.");
      this.setHelpUrl("");
    },
    onchange: function() {
      const selectedType = this.getFieldValue("TYPE");
      if (selectedType) {
        this.setOutput(true, selectedType);
        this.setTooltip(`값을 ${selectedType} 타입으로 변환합니다.`);
      }
    }
  };
};
