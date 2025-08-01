import type { BlockListResponse } from "../../../../types/block";

export const makeMathContens = (MathBlockListByCategory: BlockListResponse) =>
  MathBlockListByCategory.blocks.map((block) => ({
    kind: block.toolBoxDefinition.kind,
    type: block.type,
    inputs: block.toolBoxDefinition.toolboxInputs,
  }));
