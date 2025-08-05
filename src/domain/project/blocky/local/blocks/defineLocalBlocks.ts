import { defineControlCategoryBlocks } from "./control/blocks";
import { defineEventCategoryBlocks } from "./event/blocks";
import { defineHitCategoryBlocks } from "./hit/blocks";
import { defineLogicCategoryBlocks } from "./logic/blocks";
import { defineLoopCategoryBlocks } from "./loop/blocks";
import { defineMathCategoryBlocks } from "./math/blocks";
import { defineServiceCategoryBlocks } from "./service/blocks";
import { defineVariableBlocks } from "./variable/blocks";

export const defineLocalBlocks = () => {
  defineMathCategoryBlocks();
  defineLogicCategoryBlocks();
  defineLoopCategoryBlocks();
  defineControlCategoryBlocks();
  defineEventCategoryBlocks();
  defineServiceCategoryBlocks();
  defineVariableBlocks();
  defineHitCategoryBlocks();
};
