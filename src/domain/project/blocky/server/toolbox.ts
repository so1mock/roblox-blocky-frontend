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

  const mathCategory = findCategory("math_category");
  const logicCategory = findCategory("logic_category");
  const controlCategory = findCategory("control_category");
  const loopCategory = findCategory("loop_category");

  console.log("Toolbox generation - categories found:", {
    math: mathCategory.blocks.length,
    logic: logicCategory.blocks.length,
    control: controlCategory.blocks.length,
    loop: loopCategory.blocks.length
  });

  const mathContents = makeMathContens(mathCategory);
  const logicContents = makeLogicContens(logicCategory);
  
  console.log("Generated toolbox contents:", {
    mathContents: mathContents.length,
    logicContents: logicContents.length
  });

  console.log("Sample logic content:", logicContents.find(c => c.type === "less_than_block"));

  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "수식",
        categorystyle: "math_category",
        contents: mathContents,
      },
      {
        kind: "category",
        name: "논리",
        categorystyle: "logic_category",
        contents: logicContents,
      },
      {
        kind: "category",
        name: "제어",
        categorystyle: "control_category",
        contents: makeControlContents(controlCategory),
      },
      {
        kind: "category",
        name: "반복",
        categorystyle: "loop_category",
        contents: makeLoopContents(loopCategory),
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
