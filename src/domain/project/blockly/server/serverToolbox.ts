import type { BlockListByCategoryResponse } from "../types/block";
import { makeServerCategoryContents } from "./defineCategories";

export const toolboxFromServer = (
  blockListByCategory: BlockListByCategoryResponse[],
) => ({
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "수식",
      categorystyle: "math_category",
      contents: makeServerCategoryContents(blockListByCategory[1]),
    },
    {
      kind: "category",
      name: "논리",
      categorystyle: "logic_category",
      contents: makeServerCategoryContents(blockListByCategory[0]),
    },
    {
      kind: "category",
      name: "제어",
      categorystyle: "control_category",
      contents: makeServerCategoryContents(blockListByCategory[2]),
    },
    {
      kind: "category",
      name: "반복",
      categorystyle: "loop_category",
      contents: makeServerCategoryContents(blockListByCategory[3]),
    },
  ],
});
