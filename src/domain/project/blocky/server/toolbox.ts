import type { BlockListResponse } from "../../types/block";
import { makeLogicContens } from "./toolbox/categories/logicContents";
import { makeMathContens } from "./toolbox/categories/mathContents";
import { makeControlContents } from "./toolbox/categories/controlContents";
import { makeLoopContents } from "./toolbox/categories/loopContents";
import { makeVariableContents } from "./toolbox/categories/variableContents";

export const toolboxFromServer = (
  blockListByCategory: BlockListResponse[],
) => ({
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "수식", // 또는 서버에 따라 카테고리별 분류 가능
      categorystyle: "math_category",
      contents: makeMathContens(blockListByCategory[0]),
    },
    {
      kind: "category",
      name: "논리", // 또는 서버에 따라 카테고리별 분류 가능
      categorystyle: "logic_category",
      contents: makeLogicContens(blockListByCategory[1]),
    },
    {
      kind: "category",
      name: "제어", // 또는 서버에 따라 카테고리별 분류 가능
      categorystyle: "control_category",
      contents: makeControlContents(blockListByCategory[2]),
    },
    {
      kind: "category",
      name: "반복", // 또는 서버에 따라 카테고리별 분류 가능
      categorystyle: "loop_category",
      contents: makeLoopContents(blockListByCategory[3]),
    },
    {
      kind: "category",
      name: "변수", // 변수 카테고리 추가
      categorystyle: "variable_category",
      contents: makeVariableContents(blockListByCategory[4] || { blocks: [] }),
    },
  ],
});
