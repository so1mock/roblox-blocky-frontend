import { variableContents } from "./common/categories";
import type {
  BlockListByCategoryResponse,
  Toolbox,
} from "src/domain/myPlaces/types/block";
import { initCategories } from "./categories";

/**
 * 주어진 categoryName에 해당하는 블록 리스트를 찾아 반환합니다.
 *
 * @param blockListByCategory - 카테고리별 블록 리스트
 * @param categoryName - 찾고자 하는 카테고리 이름
 * @returns 해당 카테고리의 블록 리스트, 없으면 빈 배열
 */
const findBlockListByCategoryName = (
  blockListByCategory: BlockListByCategoryResponse[],
  categoryName: string,
): BlockListByCategoryResponse => {
  const found = blockListByCategory.find(
    (item) => item.categoryName === categoryName,
  );
  if (!found) {
    throw new Error(`Category ${categoryName} not found`);
  }
  return found;
};

export const initToolbox = (
  blockListByCategory: BlockListByCategoryResponse[],
): Toolbox => {
  const mathCategory = findBlockListByCategoryName(
    blockListByCategory,
    "math_category",
  );
  const logicCategory = findBlockListByCategoryName(
    blockListByCategory,
    "logic_category",
  );
  const controlCategory = findBlockListByCategoryName(
    blockListByCategory,
    "control_category",
  );
  const loopCategory = findBlockListByCategoryName(
    blockListByCategory,
    "loop_category",
  );

  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "수식",
        categorystyle: mathCategory.categoryName,
        contents: initCategories(mathCategory),
      },
      {
        kind: "category",
        name: "논리",
        categorystyle: logicCategory.categoryName,
        contents: initCategories(logicCategory),
      },
      {
        kind: "category",
        name: "제어",
        categorystyle: controlCategory.categoryName,
        contents: initCategories(controlCategory),
      },
      {
        kind: "category",
        name: "반복",
        categorystyle: loopCategory.categoryName,
        contents: initCategories(loopCategory),
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
