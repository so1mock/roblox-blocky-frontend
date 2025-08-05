import type { BlockListResponse } from "../../../../types/block";

export const makeLoopContents = (LoopBlockListByCategory: BlockListResponse) =>
  LoopBlockListByCategory.blocks.map((block) => ({
    kind: block.toolBoxDefinition.kind,
    type: block.type,
    inputs: block.toolBoxDefinition.toolboxInputs,
  }));
