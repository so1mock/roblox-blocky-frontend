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
  const humanoidCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "roblox_humanoid_category",
  );
  const instanceCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "roblox_instance_category",
  );
  const colorCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "color_category",
  );
  const eventCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "event_category",
  );
  const partCategory = findBlockListByCategoryName(
    blockListsByCategory,
    "roblox_part_category",
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
        name: "인스턴스",
        categorystyle: instanceCategory.categoryName,
        contents: getBlocksByCategory(instanceCategory),
      },
      {
        kind: "category",
        name: "이벤트",
        categorystyle: eventCategory.categoryName,
        contents: getBlocksByCategory({
          ...eventCategory,
          blocks: eventCategory.blocks.filter(
            (block) => block.type !== "hit_constant",
          ),
        }),
      },
      {
        kind: "category",
        name: "색상",
        categorystyle: colorCategory.categoryName,
        contents: getBlocksByCategory(colorCategory),
      },
      {
        kind: "category",
        name: "휴머노이드",
        categorystyle: humanoidCategory.categoryName,
        contents: getBlocksByCategory(humanoidCategory),
      },
      {
        kind: "category",
        name: "파트",
        categorystyle: partCategory.categoryName,
        contents: getBlocksByCategory(partCategory),
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
