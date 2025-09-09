import { variableContents } from "./common/categories";
import type { BlockListByCategoryResponse } from "src/domain/myPlaces/types/block";
import { initCategories } from "./categories";

export const initToolbox = (
  blockListByCategory: BlockListByCategoryResponse[],
) => ({
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "수식",
      categorystyle: "math_category",
      contents: initCategories(blockListByCategory[1]),
    },
    {
      kind: "category",
      name: "논리",
      categorystyle: "logic_category",
      contents: initCategories(blockListByCategory[0]),
    },
    {
      kind: "category",
      name: "제어",
      categorystyle: "control_category",
      contents: initCategories(blockListByCategory[2]),
    },
    {
      kind: "category",
      name: "반복",
      categorystyle: "loop_category",
      contents: initCategories(blockListByCategory[3]),
    },
    {
      kind: "category",
      name: "변수",
      categorystyle: "variable_category",
      contents: [
        {
          kind: "button",
          text: "새 변수 만들기",
          callbackKey: "CREATE_VARIABLE",
        },
        ...variableContents,
      ],
    },
  ],
});
