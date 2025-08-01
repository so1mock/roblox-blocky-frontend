import type { BlockListResponse } from "../../types/block";
import { makeLogicContens } from "./toolbox/categories/logicContents";
import { makeMathContens } from "./toolbox/categories/mathContents";

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
  ],
});
