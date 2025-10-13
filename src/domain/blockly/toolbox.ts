import { variableContents } from "./common/categories";
import type { BlockListByCategory, Toolbox } from "@place/types/block";
import { getBlocksByCategory } from "./categories";

/**
 * 주어진 categoryName에 해당하는 블록 리스트를 찾아 반환합니다.
 *
 * @param blockListByCategory - 카테고리별 블록 리스트
 * @param categoryName - 찾고자 하는 카테고리 이름
 * @returns 해당 카테고리의 블록 리스트, 없으면 빈 배열
 */
const findBlockListByCategoryName = (
  blockListsByCategory: BlockListByCategory[],
  categoryName: string,
): BlockListByCategory => {
  const found = blockListsByCategory.find(
    (item) => item.categoryName === categoryName,
  );
  if (!found) {
    throw new Error(`Category ${categoryName} not found`);
  }
  return found;
};

export const initToolbox = (
  blockListsByCategory: BlockListByCategory[],
): Toolbox => {
  const mathCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "math_category",
  );
  const logicCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "logic_category",
  );
  const controlCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "control_category",
  );
  const loopCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "loop_category",
  );

  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "수식",
        categorystyle: mathCategory.categoryName,
        contents: getBlocksByCategory(mathCategory),
      },
      {
        kind: "category",
        name: "논리",
        categorystyle: logicCategory.categoryName,
        contents: getBlocksByCategory(logicCategory),
      },
      {
        kind: "category",
        name: "제어",
        categorystyle: controlCategory.categoryName,
        contents: getBlocksByCategory(controlCategory),
      },
      {
        kind: "category",
        name: "반복",
        categorystyle: loopCategory.categoryName,
        contents: getBlocksByCategory(loopCategory),
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
  };
};
