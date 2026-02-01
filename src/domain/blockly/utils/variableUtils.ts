import * as Blockly from "blockly";

// 버튼 콜백 등록 함수
export const registerVariableCallbacks = (
  workspace: Blockly.WorkspaceSvg,
  openModal: () => void,
) => {
  workspace.registerButtonCallback("CREATE_VARIABLE", () => {
    openModal();
  });
};
