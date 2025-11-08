import { defineConstantCategoryBlocks } from "./staticBlocks/constantBlocks";
import { defineControlCategoryBlocks } from "./staticBlocks/controlBlocks";
import { defineEventCategoryBlocks } from "./staticBlocks/eventBlocks";
import { defineLogicCategoryBlocks } from "./staticBlocks/logicBlocks";
import { defineLoopCategoryBlocks } from "./staticBlocks/loopBlocks";
import { defineMathCategoryBlocks } from "./staticBlocks/mathBlocks";
import { definePartCategoryBlocks } from "./staticBlocks/partBlocks";
import { defineVariableBlocks } from "../../common/blocks";
import { defineHitBlocks } from "./dynamicBlocks/hitBlocks";
import { defineInstanceCategoryBlocks } from "./staticBlocks/instanceBlocks";
import { defineColorCategoryBlocks } from "./staticBlocks/colorBlocks";
import { defineHumanoidCategoryBlocks } from "./staticBlocks/humanoidBlocks";

export const initTestBlocks = () => {
  // 기본 블록
  defineMathCategoryBlocks();
  defineLogicCategoryBlocks();
  defineLoopCategoryBlocks();
  defineControlCategoryBlocks();
  defineEventCategoryBlocks();
  defineVariableBlocks();
  // 파트 블록
  definePartCategoryBlocks();
  // 동적 카테고리 블록
  defineHitBlocks();
  // 상수 블록
  defineConstantCategoryBlocks();
  // Instacne 블록
  defineInstanceCategoryBlocks();
  // Color 블록
  defineColorCategoryBlocks();
  // Humanoid 블록
  defineHumanoidCategoryBlocks();
};
