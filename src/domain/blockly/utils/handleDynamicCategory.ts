import * as Blockly from "blockly";
import { toolbox } from "../test/toolbox";
import { hitContents } from "../test/categories/dynamicCategories/hitContents";

/**
 * 워크스페이스에 "hit관련" 카테고리를 추가합니다.
 *
 * 기존 toolbox 정의(`toolbox.contents`)에 새로운 카테고리를 병합하여
 * 워크스페이스에 업데이트합니다. 이후 `refreshToolboxSelection`을 호출하여
 * 툴박스 UI를 새로고침합니다.
 *
 * @param {Blockly.WorkspaceSvg | null} workspace - 블록이 존재하는 Blockly 워크스페이스
 *
 * @example
 * const workspace = Blockly.inject("blocklyDiv", { toolbox });
 * addHitCategory(workspace);
 *
 * // 실행 후 툴박스에 "hit관련" 카테고리가 추가됩니다.
 */
export function addHitCategory(workspace: Blockly.WorkspaceSvg | null) {
  if (!workspace) return;

  const newToolbox = {
    kind: "categoryToolbox",
    contents: [
      ...toolbox.contents,
      {
        kind: "category",
        name: "hit관련",
        categorystyle: "hit_category",
        contents: hitContents,
      },
    ],
  };

  workspace.updateToolbox(newToolbox);
  workspace.refreshToolboxSelection();
}
