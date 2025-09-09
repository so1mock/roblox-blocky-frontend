import { defineConstantCategoryBlocks } from "./staticBlocks/constantBlocks";
import { defineControlCategoryBlocks } from "./staticBlocks/controlBlocks";
import { defineEventCategoryBlocks } from "./staticBlocks/eventBlocks";
import { defineLogicCategoryBlocks } from "./staticBlocks/logicBlocks";
import { defineLoopCategoryBlocks } from "./staticBlocks/loopBlocks";
import { defineMathCategoryBlocks } from "./staticBlocks/mathBlocks";
import { definePartCategoryBlocks } from "./staticBlocks/partBlocks";
import { defineServiceCategoryBlocks } from "./staticBlocks/serviceBlocks";
import { defineVariableBlocks } from "../../common/blocks";
import { defineHitBlocks } from "./dynamicBlocks/hitBlocks";

export const initTestBlocks = () => {
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
