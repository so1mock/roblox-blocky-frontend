import type { BlockListResponse } from "../../../../types/block";

export const makeLogicContens = (LogicBlockListByCategory: BlockListResponse) =>
  LogicBlockListByCategory.blocks.map((block) => ({
    kind: block.toolBoxDefinition.kind,
    type: block.type,
    inputs: block.toolBoxDefinition.toolboxInputs,
  }));
