import { defineControlCategoryBlocks } from "./blockDefinitins/controlBlockDefinitions";
import { defineEventCategoryBlocks } from "./blockDefinitins/eventBlockDefinitions";
import { defineLogicCategoryBlocks } from "./blockDefinitins/logicBlockDefinitions";
import { defineLoopCategoryBlocks } from "./blockDefinitins/loopBlockDefinitions";
import { defineMathCategoryBlocks } from "./blockDefinitins/mathBlockDefinitions";
import { definePartCategoryBlocks } from "./blockDefinitins/partBlockDefinitions";
import { defineServiceCategoryBlocks } from "./blockDefinitins/serviceBlockDefinitions";
import { defineVariableBlocks } from "./blockDefinitins/variableBlockDefinitions";

export const defineCustomBlocks = () => {
  defineMathCategoryBlocks();
  defineLogicCategoryBlocks();
  defineLoopCategoryBlocks();
  defineControlCategoryBlocks();
  defineEventCategoryBlocks();
  defineServiceCategoryBlocks();
  defineVariableBlocks();
  definePartCategoryBlocks();
};
