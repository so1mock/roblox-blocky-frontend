import * as Blockly from "blockly";
// to do: 로직 재작성 및 타입 선택 UI 수정
const handleCreateVariableButton = (workspace: Blockly.WorkspaceSvg) => {
  const variableName = window.prompt("변수 이름을 입력하세요:");
  if (!variableName) return;

  const variableType = window.prompt(
    "변수 타입을 선택하세요:\n" +
      "1. String (문자열)\n" +
      "2. Number (숫자)\n" +
      "3. Boolean (불린)\n" +
      "4. Array (배열)\n" +
      "5. Object (객체)\n" +
      "\n숫자를 입력하세요 (1-5):",
  );

  const typeMap: { [key: string]: string } = {
    "1": "String",
    "2": "Number",
    "3": "Boolean",
    "4": "Array",
    "5": "Object",
  };

  const selectedType = typeMap[variableType || "1"] || "String";

  // 변수를 선택된 타입으로 생성
  const variable = workspace
    .getVariableMap()
    .createVariable(variableName, selectedType);

  if (variable) {
    // 생성된 변수의 타입 정보를 저장 (커스텀 속성)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (variable as any).blocklyType = selectedType;

    // 툴박스 새로고침
    workspace.refreshToolboxSelection();

    console.log(
      `변수 "${variableName}"이 ${selectedType} 타입으로 생성되었습니다.`,
    );
    console.log("변수 ID:", variable.getId());
    console.log("변수 정보:", variable);
    console.log("현재 워크스페이스의 모든 변수:", workspace.getAllVariables());
  } else {
    console.error("변수 생성에 실패했습니다.");
  }
};

// 버튼 콜백 등록 함수
export const registerVariableCallbacks = (workspace: Blockly.WorkspaceSvg) => {
  workspace.registerButtonCallback("CREATE_VARIABLE", () => {
    handleCreateVariableButton(workspace);
  });
};
