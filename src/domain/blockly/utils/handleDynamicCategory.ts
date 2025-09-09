import * as Blockly from "blockly";
import toolbox from "../test/toolbox";
import { hitContents } from "../test/categories/dynamicCategories/hitContents";

/**
 * 워크스페이스에 hit 관련 카테고리를 추가
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
