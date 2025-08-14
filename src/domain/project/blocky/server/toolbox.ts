import type { BlockListResponse } from "../../types/block";
import { makeLogicContens } from "./toolbox/categories/logicContents";
import { makeMathContens } from "./toolbox/categories/mathContents";
import { makeControlContents } from "./toolbox/categories/controlContents";
import { makeLoopContents } from "./toolbox/categories/loopContents";
import { makeVariableContents } from "./toolbox/categories/variableContents";

export const toolboxFromServer = (
  blockListByCategory: BlockListResponse[],
) => {
  // categoryName으로 카테고리 찾기
  const findCategory = (categoryName: string): BlockListResponse => 
    blockListByCategory.find(category => category.categoryName === categoryName) || 
    { categoryName, blocks: [] };

  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "수식",
        categorystyle: "math_category",
        contents: makeMathContens(findCategory("math_category")),
      },
      {
        kind: "category",
        name: "논리",
        categorystyle: "logic_category",
        contents: makeLogicContens(findCategory("logic_category")),
      },
      {
        kind: "category",
        name: "제어",
        categorystyle: "control_category",
        contents: makeControlContents(findCategory("control_category")),
      },
      {
        kind: "category",
        name: "반복",
        categorystyle: "loop_category",
        contents: makeLoopContents(findCategory("loop_category")),
      },
      {
        kind: "category",
        name: "변수",
        categorystyle: "variable_category",
        contents: makeVariableContents(findCategory("variable_category")),
      },
    ],
  };
};
