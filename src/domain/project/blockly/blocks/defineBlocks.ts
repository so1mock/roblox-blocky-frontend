import { defineConstantCategoryBlocks } from "./blockDefinitions/constantBlockDefinitions";
import { defineControlCategoryBlocks } from "./blockDefinitions/controlBlockDefinitions";
import { defineEventCategoryBlocks } from "./blockDefinitions/eventBlockDefinitions";
import { defineLogicCategoryBlocks } from "./blockDefinitions/logicBlockDefinitions";
import { defineLoopCategoryBlocks } from "./blockDefinitions/loopBlockDefinitions";
import { defineMathCategoryBlocks } from "./blockDefinitions/mathBlockDefinitions";
import { definePartCategoryBlocks } from "./blockDefinitions/partBlockDefinitions";
import { defineServiceCategoryBlocks } from "./blockDefinitions/serviceBlockDefinitions";
import { defineVariableBlocks } from "./blockDefinitions/variableBlockDefinitions";
import { defineHitBlocks } from "./dynamicBlockDefinitions/hitBlockDefinitions";

export const defineCustomBlocks = () => {
  // 기본 블록
  defineMathCategoryBlocks();
  defineLogicCategoryBlocks();
  defineLoopCategoryBlocks();
  defineControlCategoryBlocks();
  defineEventCategoryBlocks();
  defineServiceCategoryBlocks();
  defineVariableBlocks();
  definePartCategoryBlocks();
  // 동적 카테고리 블록
  defineHitBlocks();
  // 상수 블록
  defineConstantCategoryBlocks();
};
